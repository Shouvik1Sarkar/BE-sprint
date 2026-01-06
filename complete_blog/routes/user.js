import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  await User.create({ fullName, email, password });
  return res.redirect("/");
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGnerateToken(email, password);
    console.log("USER: ", token);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Wrong email or password",
    });
  }
});
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    return res.render("signin");
  } catch (error) {
    return res.render("signin", {
      error: "Wrong email or password",
    });
  }
});

export default router;
