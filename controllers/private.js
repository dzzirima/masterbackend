export function getPrivateData(req,res,next){
    res.status(200).json({
        success:true,
        data:"You got acees to the private data"
    })
    
}