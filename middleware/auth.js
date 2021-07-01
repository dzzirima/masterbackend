// this files protect the riutes of all the protected routes 
import jwt from 'jsonwebtoken'
import ErrorResponce from '../helpers/errorResponse.js'

const protectRoute = async (req,res,next)=>{
    
    let token
    //return next(new ErrorResponce("Not authoriesd to acces this route",401))
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bear")
        ) {
        token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return next(new ErrorResponce("Not authoriesd to acces this route",401))
        }
    

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // next we find the id of  the user with id which was decode from the token
        console.log("dfdfdhfh")
        if(!user){
            return
            next(new ErrorResponce("no user  with ttjis id was found",404))
        }

        // set the user to the used by the folloing routes
        req.user = user;
        //next()
    
    } catch (error) {
        return next(new ErrorResponce("Not authorized to acccess this route",401))
        
    }
}
export default protectRoute