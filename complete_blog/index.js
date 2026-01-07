import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
import path from "path";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import { checkForAuthenticationCookie } from "./middleware/authentication.js";
import cookieParser from "cookie-parser";
import connectdb from "./connections/connect.js";
import Blog from "./models/blog.js";

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectdb(process.env.MONGODB_URI);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
// this is to show/access images, static asset
app.use(express.static(path.resolve("./public")));
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/", userRouter);
app.use("/blog", blogRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
