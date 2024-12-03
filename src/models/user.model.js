import mongoose, { Schema } from "mongoose";

const userSchema = new schema({
    userName:
    {
        type: String,
        required: true,
        unique: true
        
    },
    email: 
    { 
        type: String, 
        required: true,
        unique: true 
    },
    password: 
    { 
        type: String,
        required: true 
    },
    credits: 
    { 
        type: Number,
        required: true,
        default: 100
    },
    refreshToken: 
    { 
        type: String,
        required: true 
    },
    history: 
    { 
        type: Array,
        
        required: true,
        default: [] 
    }
})

export default mongoose.model("user", userSchema)    