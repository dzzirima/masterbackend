import mongoose from 'mongoose'

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:true,
        useUnifiedTopology:true
    })

    console.log("Mongodb Connected")
}


export default connectDB;