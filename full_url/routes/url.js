import express from "express";
const router = express.Router();
import {
  handleGenerateNewShortURL,
  handleredirectUrl,
  handleAnalyticsUrl,
} from "../controller/url.js";

router.route("/").post(handleGenerateNewShortURL);
router.route("/:shortId").get(handleredirectUrl);
router.route("/analytics/:shortId").get(handleAnalyticsUrl);

export default router;
