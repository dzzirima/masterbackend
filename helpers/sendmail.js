import nodemailer from 'nodemailer'

const sendEmail = (options) =>{
    const transport = nodemailer.createTransport({
        service:process.env.EMAIL_SERVICE,
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.EMAIL_FROM,
        to:options.to,
        subject:options.subject,
        html:options.text
    }
    transport.sendMail(mailOptions,function(err,infor){
        if(err){
            console.log(err)
        }else{
            console.log(infor)
        }
    })

}

export default sendEmail