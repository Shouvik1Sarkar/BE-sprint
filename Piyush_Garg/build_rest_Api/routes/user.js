import express from "express";

import {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  handlePatch,
  handleDeleteById,
} from "../controllers/user.js";
const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handlePatch)
  .delete(handleDeleteById);

export default router;
