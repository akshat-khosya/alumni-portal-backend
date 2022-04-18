const mongoose = require("mongoose");
const PersonalDetailsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    registrationNumber:{
        type:String,
        required:true,
        unique:true
    },
    collegeEmail:{
        type:String,
        required:true,
        unique:true
    },
    profilePhoto:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model("PDetails", PersonalDetailsSchema);
