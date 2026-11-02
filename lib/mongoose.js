import mongoose from 'mongoose'

const uri = process.env.MONGODB_URI 

async function connectDB(){
    try{
        if(mongoose.connection.readyState === 1){
            console.log("Already connected to MongoDB")
            return
        }
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    }
    catch(error){
        console.error("Failed to connect to MongoDB", error.message)
    }
} 

export default connectDB