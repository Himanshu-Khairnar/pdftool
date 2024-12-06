import mongoose,{Schema} from "mongoose";

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  
},{
    timestamps: true});
export default mongoose.model("File", schema);
