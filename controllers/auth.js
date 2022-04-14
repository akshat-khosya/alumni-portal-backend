const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email");
const {
  findById,
  findByIdAndUpdate,
  findOneAndUpdate,
  findOne,
} = require("../models/user");
verifyEmailTemplate = require("../utils/verifyEmailTemplate");
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const checkUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (checkUser) {
      return res
        .status(409)
        .json({ errors: [{ message: "User already exists" }] });
    }
    const salt = await bcrypt.genSalt(10);
    const hasedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hasedPass;
    const newUser = new User(req.body);
    await newUser.save((err, savedUser) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ message: "server error" }] });
      } else {
        const link = `${process.env.URL}api/auth/verifyemail/${
          savedUser.email
        }/${savedUser._id.toHexString()}`;
        console.log(link);
        sendEmail(req.body.email, "verify email", verifyEmailTemplate(link));
        return res.status(200).json({ message: "user registered succesfully" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const checkUser = await User.findOne({
      $or: [{ email: req.body.id }, { username: req.body.id }],
    });
    if (checkUser) {
      const validate = await bcrypt.compare(
        req.body.password,
        checkUser.password
      );
      if (validate) {
        if (checkUser.verification) {
          if (checkUser.adminverification) {
            const { password, ...others } = checkUser._doc;
            console.log(others);
            const token = jwt.sign(
              { uid: checkUser._id.toHexString() },
              process.env.JWT_SECRET,
              { expiresIn: "30d" }
            );
            return res.status(200).json({ useData: others, token: token });
          } else {
            return res
              .status(401)
              .json({ errors: [{ message: "Admin will verify you" }] });
          }
        } else {
          return res.status(401).json({
            errors: [{ message: "Please verify your email address" }],
          });
        }
      } else {
        return res
          .status(401)
          .json({ errors: [{ message: "Invalid Credentials" }] });
      }
    } else {
      return res
        .status(401)
        .json({ errors: [{ message: "Invalid Credentials" }] });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, token } = req.params;
  try {
    const data = await User.findOne({ email: email });
    if (data.verification) {
      return res
        .status(401)
        .json({ errors: [{ message: "You are already verified" }] });
    } else {
      if (data._id.toHexString() === token) {
        const user = await User.updateOne(
          { email: email },
          { verification: true }
        );
        if(!user){
          return res
        .status(401)
        .json({ errors: [{ message: "could not verify " }] });
        }
        return res.status(401).json({ errors: [{ message: "You are verified" }] });
      } else {
        return res.status(401).json({ errors: [{ message: "Invalid link" }] });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};
