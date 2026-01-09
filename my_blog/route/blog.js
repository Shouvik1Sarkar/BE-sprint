import express from "express";
import User from "../models/user.js";
import { setUser } from "../services/logInAuth.js";
import Blog from "../models/blog.js";
import path from "path";
import multer from "multer";

const blogRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

blogRoute.get("/add_blog", async (req, res) => {
  return res.render("add_blog");
});
blogRoute.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });
  return res.render("home", {
    blog: blog,
  });
});

export default blogRoute;
