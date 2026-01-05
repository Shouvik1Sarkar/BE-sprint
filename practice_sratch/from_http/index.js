import http from "http";
import fs from "fs";
import url from "url";
import users from "./MOCK_DATA.json" assert { type: "json" };
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { type } from "os";
const app = express();
const api_url = process.env.MONGODB_URL;
mongoose.connect(api_url).then(() => {
  console.log("MONGODB CONNECTED");
});

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
  },
  job_title: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function file_handler(path) {
  if (path == "/favicon.ico") {
    return;
  }
  const value = url.parse(path, { query: true });
  let content;
  console.log(value);
  if (!value.query.name || !value.query.id) {
    content = `${Date.now()}: ${path}\n`;
  } else {
    content = `${Date.now()}: ${path}: Name: ${value.query.name} ID: ${
      value.query.id
    }\n`;
  }
  fs.appendFile("log.txt", content, () => {});
}

app.get("/", (req, res) => {
  file_handler(req.url);
  res.send("Hello this is the page");
});

app.get("/api/about", (req, res) => {
  file_handler(req.url);
  res.send("Hi I am Shouvik");
});

app.get("/api/users", (req, res) => {
  const all_users = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(all_users);
});

app.get("/api/users/:id", (req, res) => {
  const user_id = req.params.id;
  const find_user = users.find((user) => user.id == user_id);

  return res.send(find_user);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  console.log("body", body);

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.json(501).json({ msg: "Missing attibute" });
  }

  // const user = {
  //   first_name: body.first_name,
  //   last_name: body.last_name,
  //   email: body.email,
  //   gender: body.gender,
  //   job_title: body.job_title,
  // };
  const created_user = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  // users.push({ ...user, id: users.length + 1 });

  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {});

  return res.send(`Successfully added ${created_user}`);
});

// function names(req, res) {
//   if (path == "/favicon.ico") {
//     return;
//   }

//   const value = url.parse(path, { query: true });
//   console.log(value);

//   const content = `${Date.now()}: ${path}: Name: ${value.query.name} ID: ${
//     value.query.id
//   }\n`;

//   fs.appendFile("log.txt", content, () => {});
//   switch (value.pathname) {
//     case "/":
//       res.end("This is the end.");
//       break;
//     case "/about":
//       res.end("Hi I am Shouvik");
//       break;
//     default:
//       res.end("404 Not Found.");
//       break;
//   }
// }

app.delete("/api/users/:id", async (req, res) => {
  const user_id = req.params.id;

  await User.findByIdAndDelete({ _id: user_id });

  // const deleted_users = users.filter((user) => user.id != user_id);

  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(deleted_users), () => {});

  return res.send(`Successfully deleted`);
});

app.patch("/api/users/:id", async (req, res) => {
  const user_id = req.params.id;
  const updates = req.body;

  let find_user = await User.updateOne({ _id: user_id }, { $set: updates });

  if (!find_user) {
    return res.status(501).json({ msg: "Enter a valid ID." });
  }

  Object.assign(find_user, req.body);
  console.log(find_user);

  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), () => {});

  return res.status(201).json({ msg: `done: ${find_user}` });
});

app.listen(8000, () => console.log("The server is running at 8000."));
