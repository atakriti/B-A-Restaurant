import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors"
// ===============
import User from "./user.js"
import Products from "./Products.js";
import multer from "multer"
import Pusher from "pusher"
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
app.put("/pushChatAdmin/:to", async (req, res) => {
    await User.findByIdAndUpdate({"_id":req.params.to}, {
        $push: { chat: req.body },
        $set:{messageSent:false}
    }).then(result => res.json(result))
})
app.put("/messageSentOff/:id", async (req, res) => {
    await User.findByIdAndUpdate({ "_id": req.params.id }, {
        $set:{messageSent:false}
    }).then(result => res.json(result))
})
app.put("/pushCart/:to", async (req, res) => {
    await User.findByIdAndUpdate({ "_id": req.params.to }, {
        $push: { cart: req.body,cartArchive:req.body }
    }).then(result => res.json(result))
})
app.put("/pushBook/:to", async (req, res) => {
    await User.findByIdAndUpdate({ "_id": req.params.to }, {
        $set:{book:req.body}
    }).then(result => res.json(result))
})
app.put("/pushCommentAndRate/:to", async (req, res) => {
    await User.findByIdAndUpdate({ "_id": req.params.to }, {
        $set:{comment:req.body.comment,rate:req.body.rate}
    }).then(result => res.json(result))
})


// =========================== Products ===================
let upload = multer({
    dest:"./productsImages"
})
app.use("/productsImages", express.static("./productsImages"));

app.post("/addProduct", upload.single("image"), async (req, res) => {
    let {name,ing,type,price,quan,rate} = req.body
    await Products.create({
        name,
        ing,
        type,
        price,
        quan,
        rate,
        image:`/productsImages/${req.file.filename}`
    }).then(result => res.json(result))
})

app.get("/getProducts", async (req, res) => {
    await Products.find().then(result => res.json(result))
})
app.delete("/deleteProduct/:id", async (req, res) => {
    await Products.findByIdAndDelete({"_id":req.params.id},req.body).then(result => res.json(result))
})

// ===================================== Pusher ========================
// const pusher = new Pusher({
//     appId: "1526633",
//     key: "f53671d3665007b93cb0",
//     secret: "29aab1890f706e44d816",
//     cluster: "eu",
//     useTLS: true
// });
  
// let db = mongoose.connection
// db.once("open", () => {
//     console.log("DB is connected");
//     let userCollection = db.collection("users")
//     let changeStream = userCollection.watch()
//     changeStream.on("change", (change) => {
//         console.log(change);
//         if (change.operationType === "update") {
           
//             pusher.trigger("updateUsers", "inserted", change)
//         } else {
//             console.log("There is a problem");
//         }
//     })
// })