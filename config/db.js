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

// note When you are failing to connect to db just add the following to your path 
//C:\Program Files\MongoDB\Server\3.4\bin
// THen after that ,create  C:\data\db