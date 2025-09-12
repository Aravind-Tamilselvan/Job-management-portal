import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("🗄️  Mongo DB connected")
    } catch (error) {
        console.log("Error in Connect DB controller ",error)
        process.exit(1)
    }
}

export default connectDB