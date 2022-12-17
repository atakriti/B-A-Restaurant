import mongoose from "mongoose";
let { model, Schema } = mongoose;

let Chat = new Schema({
    text: String,
    senderName: String,
    senderId: String,
}, { timestamps: true })

export default model("chat",Chat)