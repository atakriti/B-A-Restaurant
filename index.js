//! ================== Depolyment ========

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'
//! ================== Depolyment ends ========
import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors"
import { v2 as cloudinary } from 'cloudinary';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// ===============
import User from "./user.js"
import Products from "./Products.js";
import multer from "multer"
import Pusher from "pusher"
import Chat from "./chat.js"
import Freelance from "./freelance.js"
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
app.put("/emptyChat/:id", async (req, res) => {
    await User.findByIdAndUpdate({ "_id": req.params.id }, {
        $set:{chat:[]}
    }).then(result => res.json(result))
})


// =================== Those are for Chat, Cart, Book ===========================
// app.put("/pushChat/:to", async (req, res) => {
//     await User.findByIdAndUpdate({"_id":req.params.to}, {
//         $push: { chat: req.body },
//         $set:{messageSent:true}
//     }).then(result => res.json(result))
// })
app.put("/pushChat/:to", async (req, res) => {
    try {
      let newChat = await Chat.create(req.body);
      let updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.to },
          { $push: { chat: newChat },$set:{messageSent:true}},
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

//! =================== This to delete all chat from chat schema not from users
app.delete("/deleteAllChats", async (req, res) => {
    await Chat.deleteMany({}).then(result => res.json(result))
})
app.delete("/deleteChat/:id", async (req, res) => {
    await Chat.findByIdAndDelete({"_id":req.params.id},req.body).then(result => res.json(result))
})

app.put("/pushChatAdmin/:to", async (req, res) => {

    try {
        let newChat = await Chat.create(req.body);
        let updatedUser = await User.findByIdAndUpdate({ _id: req.params.to }, {
            $push: { chat: newChat },
            $set: { messageSent: false }
        }, { new: true });
        res.json(updatedUser)
    } catch (error) {
      res.status(500).send(error.message);
        
    }
    
})
app.put("/messageSentOff/:id", async (req, res) => {
    await User.findByIdAndUpdate({ "_id": req.params.id }, {
        $set:{messageSent:false}
    }).then(result => res.json(result))
})
// app.put("/pushCart/:to", async (req, res) => {
//     await User.findByIdAndUpdate({ "_id": req.params.to }, {
//         $push: { cart: req.body, cartArchive: req.body }
//     }).then(result => res.json(result))
// })
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
app.put("/updateProduct/:id", async (req, res) => {
    await Products.findByIdAndUpdate({"_id":req.params.id},req.body).then(result => res.json(result))
})
// ================================ Freelance ===========================
cloudinary?.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  });
  let storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'freelance_images'
  });
  let freelanceImages = multer({
    storage: storage
  });
// app.use("/freelanceImages", express.static("./freelanceImages"));

// app.post("/freelance/:id",freelanceImages.single("image"), async (req, res) => {
//     let { meal, price, tel, type, showAll, description, address, chefName } = req.body
//     console.log(req.file.filename);
//     await Freelance.create({
//         meal,
//         price,
//         tel,
//         type,
//         image: `/freelanceImages/${req.file.filename}`,
//         userId: req.params.id,
//         showAll,
//         description,
//         address,
//         chefName
//       }).then(result => res.json(result))
// })
// const storage = multer.memoryStorage();
// const uploadImg = multer({ storage });

app.post("/freelance/:id",freelanceImages.single("image"), async (req, res) => {
    try {
        let { meal, price, tel, type, showAll, description, address, chefName } = req.body
        let result = await cloudinary.uploader.upload(req?.file?.path, {
            public_id: `freelance_images/${req?.file?.filename}`, // to get the file name put instead of filename, originalname
            tags: 'freelance_image',
        });
        req.file.public_id = result.public_id;
        await Freelance.create({
            meal,
            price,
            tel,
            type,
            image: result.secure_url,
            userId: req.params.id,
            showAll,
            description,
            address,
            chefName,
            img_public_id:req.file.public_id
        }).then(result => res.json(result))
        console.log("req.file", req.file);
        // console.log("req?.file?.public_kid",req);
    } catch (error) {
        console.log(error);
    }
   
})

app.get("/getFreelance", async (req, res) => {
    await Freelance.find().then(result => res.json(result))
})
app.delete("/deleteFreelanceMeal/:id", async (req, res) => {
    try {
        let findImg = await Freelance.findById(req.params.id)
         await cloudinary.uploader.destroy(findImg.img_public_id);
        await Freelance.findByIdAndDelete({ "_id": req.params.id }, req.body).then(result => res.json(result))
    } catch (error) {
        console.log(error);
    }
  
})
//! ======================================== Deployment ======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
 
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
 res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

//! ===================================== Deployment ends ================
// ===================================== Pusher ========================
const pusher = new Pusher({
    appId: process.env.APPID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: "eu",
    useTLS: true
});
  
let db = mongoose.connection
db.once("open", () => {
    console.log("DB is connected");
    let userCollection = db.collection("chats")
    let changeStream = userCollection.watch()
    changeStream.on("change", (change) => {
        console.log(change);
        let fullMessage = change.fullDocument
        if (change.operationType === "insert") {
           
            pusher.trigger("updateUsers", "inserted", {
                text: fullMessage.text,
                from: fullMessage.from,
                sender: fullMessage.sender,
                timeStamp:fullMessage.timeStamp
            })
        } else {
            console.log("There is a problem");
        }
    })
})