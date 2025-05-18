import UserModel from "../model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, password });


    if (!user || user.role !== process.env.role) {
      return res.status(401).json({ message: "Invalid credentials or unauthorized access" });
    }

    res.cookie("token", user._id.toString(), {
      domain: ".ashraful.in",
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "None",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });




    return res.status(200).json({ message: "Login Successful" });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};


export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      domain: ".ashraful.in",
      httpOnly: true,
      signed: true,
      secure: true,
      sameSite: "None"
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.json({ message: "Something went wrong at logout" });
  }
};


export const checkUser = (req, res) => {

  try {
    return res.json({ loggedIn: true });
  } catch {
    return res.json({ loggedIn: false });
  }
}