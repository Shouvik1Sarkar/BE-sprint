import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import router from "./routes/url.routes.js";
import staticRouter from "./routes/staticRoutes.routes.js";
import connectdb from "./connections/connect.js";
import path from "path";
import ejs from "ejs";

connectdb(process.env.MONGODB_URI).then(() => console.log("Connected MONGODB"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("public"));

app.use("/", staticRouter);
app.use("/url/", router);

app.listen(8000, () => console.log("The app is running at port 8000"));
