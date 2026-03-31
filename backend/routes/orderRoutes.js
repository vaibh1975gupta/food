import express from "express";
import {
  placeCashOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders
} from "../controllers/orderController.js";

const router = express.Router();

// Place order
router.post("/place-order", placeCashOrder);

// Admin: get all orders
router.get("/", getAllOrders);

// Admin: update order status
router.put("/:id", updateOrderStatus);

// User: get own orders by phone
router.get("/user/:phone", getUserOrders);

export default router;