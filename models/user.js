const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:"student"
    },
    verification:{
        type:Boolean,
        default:false
    },
    adminVerification:{
        type:Boolean,
        default:false
    },
    profileExists:{
        type:Boolean,
        default:false
    },
    folderLink:{
        type:String,
        unique:true
    }


},{timestamps:true});

module.exports=mongoose.model("User",UserSchema);