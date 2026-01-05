import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
import path from "path";
import userRouter from "./routes/user.js";

import connectdb from "./connections/connect.js";

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectdb(process.env.MONGODB_URI);
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("home");
});

app.use("/", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
