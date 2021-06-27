import dotenv from 'dotenv'
dotenv.config({path:"./config.env"})
import express from 'express'



const app = express()

const PORT = process.env.PORT || 8000


app.listen(PORT , ()=>console.log(`server running on  port ${PORT}`))