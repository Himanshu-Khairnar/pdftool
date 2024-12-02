import dotenv from "dotenv";
import app from './app.js'
import ConnectDB from "./db/ConnectDb.js";
dotenv.config({ path: "./env" });

ConnectDB().then(() =>{
    app.listen(process.env.PORT || 8000, () => { console.log("Server is running on port: ", process.env.PORT) })
    app.on('error', (error) => console.log(error))
}).catch((error) => console.log(error));