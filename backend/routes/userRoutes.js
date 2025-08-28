import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getCurrentUserProfile,
  getUserById,
  loginUser,
  logoutCurrentUser,
  updateCurrentUserProfile,
  updateUserById,
} from "../controllers/userController.js";

import {
  authentication,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authentication, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);
router
  .route("/profile")
  .get(authentication, getCurrentUserProfile)
  .put(authentication, updateCurrentUserProfile);

// ADMIN ROUTES 👇🏻
router
  .route("/:id")
  .delete(authentication, authorizeAdmin, deleteUserById)
  .get(authentication, authorizeAdmin, getUserById)
  .put(authentication, authorizeAdmin, updateUserById);

export default router;
