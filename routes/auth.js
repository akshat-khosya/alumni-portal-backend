const { check } = require("express-validator");
const { register, login, verifyEmail } = require("../controllers/auth");
const { registerValidations, loginValidation } = require("../validation/auth");
const router = require("express").Router();

router.post("/newuser", registerValidations, register);
router.post("/login",loginValidation,login);
router.get('/verifyemail/:email/:token', verifyEmail);
module.exports = router;
