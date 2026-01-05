import express from "express";
import multer from "multer";
import path from "path";
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/upload", upload.single("profileiamge"), (req, res) => {});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
