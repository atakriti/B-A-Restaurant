import mongoose from "mongoose";
let { model, Schema } = mongoose;
let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
let FullDate = year + "/" + month + "/" + day
let FullTime = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() + ":" + new Date(Date.now()).getSeconds()
let result = FullDate + "–" + FullTime
let Chat = new Schema({
    text: String,
    from: String,
    sender: String,
    timeStamp:{type:String,default:result}
}, { timestamps: true })

export default model("chat",Chat)