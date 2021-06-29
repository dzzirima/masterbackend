import ErrorResponce from "../helpers/errorResponse.js";
// so basically for every error passed it gets cached by  the error handler and that  error hander 
// midleware should be the last thing passed as of all the middlewares

const errorHandler   = (err,req,res,next)=>{
    // error should always be the firts thing in aguments
    // the errors that we are getting are coming from mongoose and we need to map then to web errors

    // use this to build more rebust error codes
    //console.log(err)


    let error = { ...err};
    error.message = err.message

    if(err.code === 11000){
        // this error code is coming from mongoose remember
        const message = `Duplicate Field Value Enterd`
        error = new ErrorResponce(message,400)
    }

    if (err.name = "ValidationError"){
        //const message = Object.values(err.errors).map((val)=>val.message)
        //console.log(err)
        error = new ErrorResponce("Please provide correct login Credentials",400)

    }
    // now we need to get the status code we created from the above error
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || "Server Error"

    });


}

export  default errorHandler