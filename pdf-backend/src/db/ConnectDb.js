import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv";    
const ConnectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected:", connectionInstance.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default ConnectDB;
