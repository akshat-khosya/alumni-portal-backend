const { checkAuth } = require("../middleware/checkAuth");
const { upload } = require("../middleware/upload");

const router=require("express").Router();


router.post("/newPost",checkAuth);

module.exports=router;