import express from "express";
import User from "../model/user.js";
import {
  handleHomeRoute,
  handleCreateUser,
  handleCreateUserById,
  handleEditUser,
  handleDeleteUser,
} from "../controllers/user.js";

const router = express.Router();
router.route("/").get(handleHomeRoute).post(handleCreateUser);

router
  .route("/:id")
  .get(handleCreateUserById)
  .patch(handleEditUser)
  .delete(handleDeleteUser);

export default router;
