import dotenv from 'dotenv'
dotenv.config({path:"./config.env"})
import express from 'express'
import authRoutes from './routes/auth.js'

const app = express()

app.use(express.json()) // this middleware allows us to get data from the body 

app.use("/api/auth",authRoutes)
const PORT = process.env.PORT || 8000


app.listen(PORT , ()=>console.log(`server running on  port ${PORT}`))