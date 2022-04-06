const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    fname:{
        type:String
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
        type:String
    },
    verifcation:{
        type:Boolean,
        default:false
    },
    adminVerifcation:{
        type:Boolean,
        default:false
    },
    profileExits:{
        type:Boolean,
        default:false
    }


},{timestamps:true});

module.exports=mongoose.model("User",UserSchema);