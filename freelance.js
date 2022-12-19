import mongoose from "mongoose"
let { model, Schema } = mongoose




let special = new Schema({
    meal: String,
    price: Number,
    tel: Number,
    type: String,
    image: String,
    userId: String,
    showAll: { type: String, default: "showall" },
    description: String,
    address: String,
    chefName:String
})

export let Special = model("special", special)