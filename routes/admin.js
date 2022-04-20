const { verifyUser } = require("../controllers/admin");
const { checkAuth, isAdmin } = require("../middleware/checkAuth");

const router = require("express").Router();


router.post("/verifyUser",checkAuth,isAdmin,verifyUser );


module.exports=router;