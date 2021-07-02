// all these export will be exported as named exports 
import ErrorResponce from '../helpers/errorResponse.js';
import sendEmail from '../helpers/sendmail.js';
import User  from '../models/User.js'
export async function  register(req, res, next){
    const {username,email,password} = req.body
    

    try {
        // create a user
        const user = await User.create({
            username,email,password
        });
        sendToken(user,201,res)
    } catch (error) {
        // so when ever nodejs encounters an error it uses that middleware
        next(error)

    }
}

export async function login(req, res, next){
    // steps get the email & paswword 
    const {email, password } = req.body;
    
    if(!email || !password){
        return next(new ErrorResponce("Please provide email and password",400))
    }
    //check if the user  is in the  database

    try {
        // get the user with and the password 
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return next(new ErrorResponce("Invalid credentials",401))
        }
 
        // check if the user password matches and it has to be run on an instance of the user  and add the await for it takes time
        const isMatch = await user.matchPasswords(password) 
        // if the password dont match then 
       
        if(!isMatch){
            return next(new ErrorResponce("Invalid credentials",401))
        }

        // if all the test are passed then respond with a login token for the login of the user
        sendToken(user,201,res)
        

    } catch (error) {
        console.log(error)
        res.status(200).json({
            success:false,
            error:error.message
        });
        
    }
}

export async function forgotpassword(req, res, next){
    const { email } = req.body
    console.log(email)
    
    try {
        const user = await User.findOne({email})
        
        if(!user){
            return next(new ErrorResponce("Email could not be sent",404))
        }
        const resetToken = user.getResetPasswordToken();
        
        // save use to the database
        await user.save();
        
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
        const message = `
        <h1> You have requested a password reset </h1>
        <p>Please go to the following url  to reset your password </p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

        `// u ca use pug to do this
        try {
            await sendEmail({
                to:user.email,
                subject:"Password Reset Request",
                text:message
            });
            res.status(200).json({
                success:true,
                data:"Email sent"
            })
            
        } catch (error) {
            console.log(error)
            /// clear all the reset token before you save to the database
            user.getResetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            
            await user.save()
            return next(new ErrorResponce("Email could not be send",500))
            
        }


    } catch (error) {
        console.log(error)
        next(error)
        
    }
}

export function resetpassword(req, res, next){
    res.send("Reset passeord Route")
}

// function to handle the sending of the token
const sendToken = (user,statusCode,res) =>{
    
    const token = user.getSignedToken();
    console.log(token)
    res.status(statusCode).json({
        success:true,
        token
    })

}