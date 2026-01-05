import express from "express";
import dotenv from "dotenv";
import { add_file } from "./middlewares/index.js";

dotenv.config();

import router from "./routes/user.js";
import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MONGODB CONNECTED"));

app.use(add_file("log.txt"));
app.use("/", router);
app.use("/api/users/", router);
console.log("-----------");
app.listen(8000, () => console.log("The app is running at 8000"));
