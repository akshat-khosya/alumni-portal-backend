const { check } = require("express-validator");
const registerValidations = [
  check("email").isEmail(),
  check("password").isLength({ min: 6 }),
  check("username")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Username length should be between 4 to 20 charchaters.")
    .isAlphanumeric()
    .withMessage("Username should only contain A-Z,a-z,0-9"),
];
const loginValidation=[
check("password").isLength({ min: 6 })];
module.exports = {registerValidations,loginValidation};
