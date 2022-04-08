const { check } = require("express-validator");
const { register } = require("../controllers/auth");
const { registerValidations } = require("../validation/register");
const router = require("express").Router();

router.post("/newuser", registerValidations, register);

module.exports = router;
