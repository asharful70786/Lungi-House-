import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import ProductModel from "./model/productModel.js";
import UserModel from "./model/userModel.js";
import checkAuthMiddleWare from "./middleWare/checkAuthMiddleWare.js";



dotenv.config();
await ConnectDb();
const app = express();
app.use(cookieParser());
import sendMail from "./services/mailSendServices.js";



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
    const updated = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
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

app.post("/upload", checkAuthMiddleWare, async (req, res) => {
  let { data } = req.body;
  try {
    let product = await ProductModel.create(data);
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Error during upload" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, password });
    // if (user.role !== process.env.role) return res.status(401).json({ message: "You are not authenticated to log in. Only the Owner of the website can authenticate to log in." });
    res.cookie("token", user._id, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    })
    return res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    return res.status(404).json({ message: "User not found , invalid credentials" });
  }
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logout Successfully" });
});

app.get('/auth/check', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false });

  // verify token logic
  // res.send('hello')
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