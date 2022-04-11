const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
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
        return res.status(200).json({ message: "user registered succesfully" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ message: "server error" }] });
  }
};
// login
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
        if (checkUser.verifcation) {
          if (checkUser.adminVerifcation) {
            const {password,...others}=checkUser._doc;
            console.log(others);
            const token = jwt.sign({uid:checkUser._id.toHexString()}, process.env.JWT_SECRET,{ expiresIn: "30d" });
            return res.status(200).json({useData:others,token:token});
          } else {
            return res
              .status(401)
              .json({ errors: [{ message: "Admin will verify you" }] });
          }
        } else {
          return res
            .status(401)
            .json({ errors: [{ message: "Please verify your email address" }] });
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
