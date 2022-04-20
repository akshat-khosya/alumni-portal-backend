const { json } = require("express/lib/response");
const { updateOne } = require("../models/user");

exports.verifyUser = async (req, res) => {
    try {
        const result=await updateOne({_id:req.body.id},{adminVerification:req.body.verifyStatus});
        if(result){
           return res.status(200).json({ errors: [{ message: "User verified" }] })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ message: "server error" }] });
    }
  
};
