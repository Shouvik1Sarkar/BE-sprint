import express from "express";
import http from "http";

const app = express();

app.get("/", (req, res) => {
  res.send("This is -------");
});

app.listen(3000, () => {
  console.log("Hello This is it");
});
