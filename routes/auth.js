const { check } = require("express-validator");
const {checkAuth}=require("../middleware/checkAuth");
const { register, login, verifyEmail,autoLogin, personalDetails } = require("../controllers/auth");
const { registerValidations, loginValidation } = require("../validation/auth");
const router = require("express").Router();

router.post("/newuser", registerValidations, register);
router.post("/login",loginValidation,login);
router.get('/verifyemail/:email/:token', verifyEmail);
router.get('/autoLogin',checkAuth,autoLogin);
router.post('/personalDetails',checkAuth,personalDetails);

module.exports = router;
