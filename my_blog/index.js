import express from "express";

import dotenv from "dotenv";
dotenv.config({ path: ".././.env" });

// IMPORT DAB CONNECTION FUNCTION

import connect_db from "./connections/connection.js";

// IMPORT ROUTES

import userRoute from "./route/user.js";

// CONNECT DB

connect_db(process.env.MONGODB_URI_BLOG);

const app = express(); // initialze app

const PORT = 8000;

app.get("/", (req, res) => {
  return res.send("Home page");
});

app.use("/", userRoute);

app.listen(PORT, () => console.log("APP RUNNING AT PORT ", PORT));
