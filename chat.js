import mongoose from "mongoose";
let { model, Schema } = mongoose;

let Chat = new Schema({
    text: String,
    from: String,
    sender:String
}, { timestamps: true })

export default model("chat",Chat)