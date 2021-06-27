import dotenv from 'dotenv'
dotenv.config({path:"./config.env"})

import connectDB from './config/db.js'
// connect db
connectDB()


import express from 'express'
import authRoutes from './routes/auth.js'

const app = express()

app.use(express.json()) // this middleware allows us to get data from the body 

app.use("/api/auth",authRoutes)
const PORT = process.env.PORT || 8000


const server = app.listen(PORT , ()=>console.log(`server running on  port ${PORT}`))

process.on("unhandledRejection",(error, promise)=>{
    console.log(`Logged Error: ${error}`);

    // graciously kill the server
    server.close(()=>process.exit(1))
})