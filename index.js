import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors"
// ===============
import User from "./user.js"
// import Chat from "./chat.js"
let app = express()
app.use(cors())
app.use(express.json())
app.listen(process.env.PORT || 5000, () => console.log("server is listening..."))
mongoose.connect(process.env.MONGO)
// ================== users ===============
app.post("/newUser", async (req, res) => {
    await User.create(req.body).then(result => res.json(result))
})
app.get("/getAllUsers",async (req, res) => {
    await User.find().then(result => res.json(result))
})
app.put("/updateUser/:id",async (req, res) => {
    await User.findByIdAndUpdate({"_id":req.params.id},req.body).then(result => res.json(result))
})
// =================== Those are for Chat, Cart, Book ===========================
app.put("/pushChat/:to", async (req, res) => {
    await User.findByIdAndUpdate({"_id":req.params.to}, {
        $push: { chat: req.body },
        $set:{messageSent:true}
    }).then(result => res.json(result))
})
app.put("/pushCart/:to", async (req, res) => {
    await User.findByIdAndUpdate({ "_id": req.params.to }, {
        $push: { cart: req.body },
        $push:{cartArchive:req.body}
    }).then(result => res.json(result))
})
app.put("/pushBook/:to", async (req, res) => {
    await User.findByIdAndUpdate({ "_id": req.params.to }, {
        $set:{book:req.body}
    }).then(result => res.json(result))
})