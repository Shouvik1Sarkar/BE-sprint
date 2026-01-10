import express from "express";
import User from "../models/user.js";
import { setUser } from "../services/logInAuth.js";
import Blog from "../models/blog.js";
import path from "path";
import multer from "multer";
import Comment from "../models/comment.js";

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
  return res.redirect(`/blog/${blog._id}`);
});

blogRoute.get("/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById({ _id: blogId }).populate("createdBy");
  const comments = await Comment.find({ blogId: req.params.id }).populate(
    "createdBy"
  );
  console.log("999999: ", comments);
  return res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

blogRoute.post("/comment/:id", async (req, res) => {
  const comment = await Comment.create({
    comment: req.body.comment,
    createdBy: req.user._id,
    blogId: req.params.id,
  });
  console.log("COMMENT", comment);
  // return res.render("blog", {});
  return res.redirect(`/blog/${req.params.id}`);
});

export default blogRoute;
