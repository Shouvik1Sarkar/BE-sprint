import express from "express";
import User from "../models/user.js";
import { setUser } from "../services/logInAuth.js";

const userRoute = express.Router();

userRoute.get("/signup", async (req, res) => {
  return res.render("signup");
});
userRoute.get("/signin", async (req, res) => {
  return res.render("signin");
});
userRoute.post("/user/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const user = await User.create({
    fullName,
    email,
    password,
  });
  if (!user) {
    return res.status(501).json({
      error: "User Not created",
    });
  }
  return res.redirect("/");
});
userRoute.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("===============");
  console.log("email: ", email);
  console.log("password: ", password);
  const token = await User.matchPassword(email, password);
  console.log("MATCH PASSWORD: ", token);
  if (!token) {
    return res.status(501).json({
      error: "User not found",
    });
  }

  // const token = setUser(user);
  // res.cookie("token", token);
  res.cookie("token", token).redirect("/");
});

userRoute.get("/user/logout", async (req, res) => {
  return res.clearCookie("token").redirect("/");
  // return res.render("signin");
});

export default userRoute;
