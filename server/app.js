import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import ProductModel from "./model/productModel.js";
import UserModel from "./model/userModel.js";
import cookieParser from "cookie-parser";


dotenv.config();
await ConnectDb();
const app = express();
app.use(cookieParser());

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use((req, res, next) => {
//   let u_id = req.cookies.u_id;
//   if (!u_id) {
//     return res.status(401).json({ message: "Your not Authenticated to login  , So Don't Try to Access our website " });
//   }
//   next();
// })

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


app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updated = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(updated);
  } catch (error) {
    return res.status(404).json({ message: "Error on updating time " });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await ProductModel.findByIdAndDelete(id);
    return res.json(deleted);
  } catch (error) {
    return res.status(404).json({ message: "Product not found" });
  }
});

app.post("/upload", async (req, res) => {
  let {data} = req.body;
  console.log(`this is data from post req to upload ${data}`);
  try {
    let product = await ProductModel.create(data);
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ message: "Error on uploading time " });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, password });
    return res.cookie("u_id", user._id, {
      httpOnly: true
    }).json(user);
  } catch (error) {
    return res.status(404).json({ message: "User not found , invalid credentials" });
  }
})

app.post("logout", (req, res) => {
  return res.clearCookie("u_id").json({ message: "Logout Successfull" });
})

app.listen(3000, () => console.log("Server running on port  3000"));                                                                                                                 