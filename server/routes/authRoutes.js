import express from "express";
const router = express.Router();
import checkAuthMiddleWare from "../middleWare/checkAuthMiddleWare.js";
import {  loginUser, logoutUser , checkUser } from "../controllers/authController.js";



router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get('/check', checkAuthMiddleWare, checkUser);


export default router;









