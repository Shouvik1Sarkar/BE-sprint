import express from "express";
import router from "./routes/url.js";
import staticUrl from "./routes/staticRouter.js";
import dotenv from "dotenv";
import path from "path";
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

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public")); // without this the css will not work

// app.get("/", (req, res) => res.send("This is home"));

// const output = ejs.render(template, data);

app.use("/url/", router);
app.use("/", staticUrl);

app.listen(8000, () => console.log("The app is running at 8000"));
