import express from "express";
import {
  handleCreateUrl,
  handleclickUrl,
  handleViews,
  handleHomeRoute,
} from "../controllers/url.js";

const router = express.Router();

router.route("/").get(handleHomeRoute).post(handleCreateUrl);
router.route("/:id").get(handleclickUrl);
router.route("/status/:id").get(handleViews);

export default router;
