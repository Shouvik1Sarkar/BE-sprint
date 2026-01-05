import express from "express";
import { handleHomepage } from "../controllers/url.controllers.js";
const router = express.Router();
router.route("/").get(handleHomepage);
router.get("/status", (req, res) => {
  res.render("view_status"); // Renders view_status.ejs
});

export default router;
