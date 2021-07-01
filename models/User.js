import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import crypto from 'crypto'
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
    resetPasswordExpire:Date
});

// working with middleware in mongoose
UserSchema.pre("save", async function (next) {
    // checks if we are not changing the password , avoid rehashing of the hashed password
    if(!this.isModified("password")){
        next()
    }

    // get the salt and encrpt the password
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password,salt)
    next()

    
})
UserSchema.methods.matchPasswords = async function(password){
    return await bcryptjs.compare(password,this.password);
}
UserSchema.methods.getSignedToken = function(){
    return jwt.sign(
        {id :this._id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRE})

}
// function to generate a reset token

UserSchema.methods.generateResetToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    //  savin to to the database
    this.resetPasswordExpire = Date.now() +10 * (60*1000)
    return resetToken;

}

const User = mongoose.model("User",UserSchema)

export default User