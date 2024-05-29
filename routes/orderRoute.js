import express from "express"
import authMiddleware from "../middlewares/auth.js"
import { listOrders, placeOrder, updateStatus, userOrder, verifyOrder } from "../controllers/orderController.js";
const orderRouter = express.Router();

orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify',authMiddleware, verifyOrder);
orderRouter.post('/userorders',authMiddleware, userOrder);
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateStatus);

export default orderRouter;