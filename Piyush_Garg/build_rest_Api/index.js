import dotenv from "dotenv";
import express from "express";
// import users from "./MOCK_DATA.json" with { type: "json" };
import fs from "fs";
import path from "path";
import User from "./models/user.js";
import connectDB from "./connection/connection.js";

import userRouter from "./routes/user.js";
import { logResRes } from "./middleware/index.js";

dotenv.config();
const app = express();

const port = 8000;

// Connect mongoose

connectDB(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGODB CONNECTED.");
  })
  .catch((err) => {
    console.log("MONGODB CONNECTION ERROR: ", err);
  });

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/api/users/", userRouter);

app.use(logResRes("log.txt"));

app.listen(8000, () => console.log(`The app is running at port ${port}`));
