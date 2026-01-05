import express from "express";
import { handleUserSignUp, handleLogIn } from "../controller/user.js";
const router = express.Router();

router.route("/").post(handleUserSignUp); // try to make it /signup = /user/signup
router.route("/login").post(handleLogIn);

export default router;
