import express from "express";
import User from "../models/user.js";

const userRoute = express.Router();

userRoute.get("/signup", async (req, res) => {
  return res.redirect("/signup");
});
userRoute.get("/signin", async (req, res) => {
  return res.redirect("/signin");
});
userRoute.post("/signup", async (req, res) => {
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
  return res.status(201).json({
    message: "User created",
    user,
  });
});
userRoute.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });
  if (!user) {
    return res.status(501).json({
      error: "User not found",
    });
  }
  return res.status(201).json({
    message: "User found",
    user,
  });
});

export default userRoute;
