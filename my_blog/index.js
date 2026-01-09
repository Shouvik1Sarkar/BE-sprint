import express from "express";

import dotenv from "dotenv";
dotenv.config({ path: ".././.env" });

import path from "path";

import cookieParser from "cookie-parser";

// IMPORT DAB CONNECTION FUNCTION

import connect_db from "./connections/connection.js";

// IMPORT ROUTES

import userRoute from "./route/user.js";
import blogRoute from "./route/blog.js";

import { checkAuthentication } from "./middleware/checkAuth.js";

// CONNECT DB

connect_db(process.env.MONGODB_URI_BLOG);

const app = express(); // initialze app

const PORT = 8000;

// set ejs

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(checkAuthentication("token"));
app.use(express.static(path.resolve("./public")));

// app.get("/", (req, res) => {
//   return res.render("home", {
//     user: req.user,
//   });
// });

app.use("/", userRoute);
app.use("/blog", blogRoute);

app.listen(8000, () => console.log("APP RUNNING AT PORT ", PORT));
