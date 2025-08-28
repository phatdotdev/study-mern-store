import express from "express";
const router = express.Router();

import {
  authentication,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import {
  calculateTotalSales,
  calculateTotalSalesByDate,
  countTotalOrders,
  createOrder,
  findOrderById,
  getAllOrders,
  getUserOrders,
  markOrderAsDelivered,
  markOrderAsPaid,
} from "../controllers/orderController.js";

router
  .route("/")
  .post(authentication, createOrder)
  .get(authentication, authorizeAdmin, getAllOrders);

router.route("/mine").get(authentication, getUserOrders);
router.route("/total-orders").get(countTotalOrders);
router.route("/total-sales").get(calculateTotalSales);
router.route("/total-sales-by-date").get(calculateTotalSalesByDate);
router.route("/:id").get(authentication, findOrderById);
router.route("/:id/pay").put(authentication, markOrderAsPaid);
router
  .route("/:id/deliver")
  .put(authentication, authorizeAdmin, markOrderAsDelivered);
export default router;
