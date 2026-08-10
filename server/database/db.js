import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
    try{
        // console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ MONGODB connected");
        

    }
    catch(error){
           console.error("❌ MongoDB connection error", error);
           process.exit(1)
           
    }
}



export default connectDB;