import express from "express";
import router from "./routes/url.js";
import dotenv from "dotenv";
dotenv.config();

import connectUrl from "./connection/connect.js";

const app = express();
connectUrl(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGODB CONNECTED");
  })
  .catch((err) => {
    console.error("ERROR: ", err);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => res.send("This is home"));

app.use("/", router);

app.listen(8000, () => console.log("The app is running at 8000"));
