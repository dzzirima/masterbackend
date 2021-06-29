// all these export will be exported as named exports 
import ErrorResponce from '../helpers/errorResponse.js';
import User  from '../models/User.js'
export async function  register(req, res, next){
    const {username,email,password} = req.body
    console.log(username,email,password)

    try {
        // create a user
        const user = await User.create({
            username,email,password
        });
        res.status(201).json({
            success:true,
            user:user
        })
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
 
        // check if the user password matches and it has to be run on an instance of the user 
        const isMatch = user.matchPasswords(password)
        // if the password dont match then 
        if(!isMatch){
            return next(new ErrorResponce("Invalid credentials",401))
        }

        // if all the test are passed then respond with a login token for the login of the user
        res.status(200).json({
            success:true,
            token:"12233"
        })
        

    } catch (error) {
        res.status(200).json({
            success:false,
            error:error.message
        });
        
    }
}

export function forgotpassword(req, res, next){
    res.send("Forgot Password Route")
}

export function resetpassword(req, res, next){
    res.send("Reset passeord Route")
}