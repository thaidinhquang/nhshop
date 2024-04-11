import { Router } from "express";
import {
    createOrder,
    getOrderById,
    getOrders,
    updateOrder
} from "../controllers/orders";

const router = Router();

// tạo mới một đơn hàng
router.post("/orders", createOrder);

// lấy tất cả đơn hàng
router.get("/orders", getOrders);

// lấy một đơn hàng theo ID
router.get("/orders/:userId/:orderId", getOrderById);

// cập nhật thông tin của một đơn hàng
router.put("/orders/:id", updateOrder);

// xóa một đơn hàng
// router.delete("/orders/:id", deleteOrder);
export default router;
