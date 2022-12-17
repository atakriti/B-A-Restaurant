import mongoose from "mongoose";
let { model, Schema } = mongoose;

let product = new Schema({
    name: String,
    image: String,
    ing: String,
    type: String,
    price: Number,
    quan: { type: Number, default: 1 },
    rate:{type:Number,default:1}
})
export default model("product",product)