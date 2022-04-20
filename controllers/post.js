const Posts=require("../models/posts");

exports.newPost=async(req,res)=>{
    try {

        // const data={
        //     userId:req.user,
        //     ...req.body
        // }
        // const newPost=new Posts(data);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ errors: [{ message: "server error" }] });
    }
}