const { register } = require("../controllers/auth");

const router = require("express").Router();

router.post("/newuser", register);

module.exports = router;
