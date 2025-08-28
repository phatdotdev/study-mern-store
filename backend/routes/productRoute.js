import express from "express";
import fomidable from "express-formidable";
const router = express.Router();

import {
  authentication,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  addProduct,
  addProductReview,
  fetchAllProducts,
  fetchNewProducts,
  fetchProductById,
  fetchProducts,
  fetchTopProducts,
  filterProducts,
  removeProduct,
  updateProductDetails,
} from "../controllers/productController.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authentication, authorizeAdmin, fomidable(), addProduct);
router.route("/allProducts").get(fetchAllProducts);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);
router
  .route("/:id")
  .get(checkId, fetchProductById)
  .put(
    authentication,
    authorizeAdmin,
    checkId,
    fomidable(),
    updateProductDetails
  )
  .delete(authentication, authorizeAdmin, checkId, removeProduct);

router.route("/:id/reviews").post(authentication, addProductReview);

router.route("/filtered-products").post(filterProducts);
export default router;
