import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide the username"]
    },
    email:{
        type:String,
        required:[true, "Please provide an email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please add  a password"],
        minlength:6,
        // when we query  for the user do we want to return the password 
        select:false
    },
    resetPasswordToken:String,
    resetPasswordDate:Date
});

const User = mongoose.model("User",UserSchema)

module.exports = User