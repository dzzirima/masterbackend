import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
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

// working with middleware in mongoose
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next()
    }

    // get the salt and encrpt the password
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password,salt)
    next()

    
})


const User = mongoose.model("User",UserSchema)

export default User