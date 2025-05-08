import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import ProductModel from "./model/productModel.js";
import UserModel from "./model/userModel.js";
import checkAuthMiddleWare from "./middleWare/checkAuthMiddleWare.js";
import sendMail from "./services/mailSendServices.js";
import cloudinary from 'cloudinary';
import upload from "./config/uploadConfig.js";
import { uploadImage } from "./services/CloudinaryServices.js";


dotenv.config();
await ConnectDb();
const app = express();
app.use(cookieParser("this is key"));



app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));




app.get("/", async (req, res) => {
  try {
    let product = await ProductModel.find();
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Error on fetching Data" });
  }
});
app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
})


app.put("/update/:id", checkAuthMiddleWare, async (req, res) => {
  const id = req.params.id;
  try {
    await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    return res.status(404).json({ message: "Error on updating time " });
  }
});

app.delete("/delete/:id", checkAuthMiddleWare, async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await ProductModel.findByIdAndDelete(id);
    return res.json({ message: "Product deleted successfully" });

  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
});

app.post("/upload", checkAuthMiddleWare, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description, isBestSelling } = req.body;
    if (!req.file) return res.status(400).json({ message: "Image file missing" });
    if (req.file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ message: "File too large. Max size is 5MB" });
    }

    let imageUploadResponse;
    try {
      imageUploadResponse = await uploadImage(req.file);
    } catch (cloudError) {
      console.error("Cloudinary Upload Error:", cloudError);
      return res.status(500).json({ message: "Image upload failed" });
    }
    const product = new ProductModel({
      name,
      price,
      category,
      description,
      image: imageUploadResponse.secure_url,
      isBestSelling,
    });

    await product.save();

    res.status(201).json({ message: "Uploaded successfully", product });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, password });
    //Mongoose only gives you access to fields defined in the schema. Even if the MongoDB document has role, if it's not in the schema, it won't be accessible in our code.

    if (!user || user.role !== process.env.role) {
      return res.status(401).json({ message: "Invalid credentials or unauthorized access" });
    }

    res.cookie("token", user._id.toString(), {
      httpOnly: true,
      signed: true,
      secure: false, // true in production
      sameSite: "lax",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 30), // 30 days expiration 
    });

    return res.status(200).json({ message: "Login Successful" });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout Successfully" });
});

app.get('/auth/check', checkAuthMiddleWare, (req, res) => {

  try {
    return res.json({ loggedIn: true });
  } catch {
    return res.json({ loggedIn: false });
  }
});

app.post("/contact-us", async (req, res) => {
  const { name, email, phone, message } = req.body;
  try {
    await sendMail(name, email, phone, message);
    return res.json({ message: "message sent successfully" })
  } catch (error) {
    return res.status(404).json({ message: "Failed to send message" });
  }
})


app.listen(3000, () => console.log("Server running on port  3000"));                                                                                                                 