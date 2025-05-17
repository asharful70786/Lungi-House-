import UserModel from "../model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
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
};


export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};


export const checkUser =  (req, res) => {

  try {
    return res.json({ loggedIn: true });
  } catch {
    return res.json({ loggedIn: false });
  }
}