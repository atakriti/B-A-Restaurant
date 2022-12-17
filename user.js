import mongoose from "mongoose";
let { model, Schema } = mongoose;

let User = new Schema({
    username: String,
    email: String,
    password: String,
    city: String,
    street: String,
    plz: String,
    tel: String,
    chat: Array,
    book: { type: Schema.Types.Mixed, default: {} },
    cart: Array,
    comment: String,
    rate: Number,
    cartArchive: Array,
    messageSent:{type:Boolean,default:false}
}, { minimize: false })
export default model("user",User)