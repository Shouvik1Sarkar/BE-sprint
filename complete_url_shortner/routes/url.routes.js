import express from "express";
import {
  handleCreateRoute,
  handleRedirect,
  handleStatsRoute,
} from "../controllers/url.controllers.js";

const router = express.Router();

router.route("/").post(handleCreateRoute);
router.route("/:id").get(handleRedirect);
router.route("/stats/:id").get(handleStatsRoute);

export default router;
