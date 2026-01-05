import express from "express";
const router = express.Router();
import Url from "../models/url.js";

router.get("/", async (req, res) => {
  if (!req.user) {
    return res.render("login");
  }
  const all_urls = await Url.find({ createdBy: req.user._id });
  return res.render("home", { urls: all_urls });
});
router.get("/signup", async (req, res) => {
  // const all_urls = await Url.find({});
  return res.render("signup");
});
router.get("/login", async (req, res) => {
  // const all_urls = await Url.find({});
  return res.render("login");
});
// in case of change

// router.get("/login", async (req, res) => {
//   const error =
//     req.query.error === "invalid" ? "Password or Email is wrong" : undefined;
//   return res.render("login", { error });
// });

export default router;

// for login ejs

// <% if (typeof error !== 'undefined') { %>
//     <p style="color: red;"><%= error %></p>
//   <% } %>
