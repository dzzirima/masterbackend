// all these export will be exported as named exports 

export function register(req, res, next){
    res.send("Register Route")
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