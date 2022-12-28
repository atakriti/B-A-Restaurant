import mongoose from "mongoose"
let { model, Schema } = mongoose




let Freelance = new Schema({
    meal: String,
    price: Number,
    tel: Number,
    type: String,
    image: String,
    userId: String,
    showAll: { type: String, default: "showall" },
    description: String,
    address: String,
    chefName: String,
    img_public_id:String
})

export default model("freelance", Freelance)