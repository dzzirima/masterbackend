// all these export will be exported as named exports 
import User  from '../models/User.js'
export async function  register(req, res, next){
    const {username,email,password} = req.body

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
        res.status(501).json({
            success:true,
            error:error.message
        })
        
    }
}

export function login(req, res, next){
    res.send("LOgin Route")
}

export function forgotpassword(req, res, next){
    res.send("Forgot Password Route")
}

export function resetpassword(req, res, next){
    res.send("Reset passeord Route")
}