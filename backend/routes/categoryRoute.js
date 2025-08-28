import express from "express";
const router = express.Router();

import {
  authentication,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  removeCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";

router
  .route("/")
  .get(getAllCategories)
  .post(authentication, authorizeAdmin, createCategory);
router
  .route("/:categoryId")
  .get(authentication, authorizeAdmin, getCategoryById)
  .put(authentication, authorizeAdmin, updateCategoryById)
  .delete(authentication, authorizeAdmin, removeCategoryById);

export default router;
