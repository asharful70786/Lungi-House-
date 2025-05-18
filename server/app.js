import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./config/db.js";
import sendMail from "./services/mailSendServices.js";
import userRoute from "./routes/authRoutes.js";
import productRoute from "./routes/productRoutes.js";


dotenv.config();
await ConnectDb();
const app = express();
app.use(cookieParser("this is key"));



app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin: "https://lungi-house-8tpb.vercel.app/",
  credentials: true
}));


app.use("/auth", userRoute);
app.use("/", productRoute)



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