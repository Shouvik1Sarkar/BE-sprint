import express from "express";
import dotenv from "dotenv";
dotenv.config({});
import connectToMongoDB from "./connect/connect.js";
import path from "path";
import Url from "./models/url.js";
import cookieParser from "cookie-parser";
import { restrictToLoggedInUserOnly, checkAuth } from "./middleware/auth.js";

// routes
import urlRoute from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// set ejs to express

app.set("view engine", "ejs");

// it says all the views are in views folder

app.set("views", path.resolve("./views"));

connectToMongoDB(process.env.MONGODB_URI);

// Routes register

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRouter);
app.use("/user", userRoute);

app.listen(8000, () => console.log("App running at port 8000"));
