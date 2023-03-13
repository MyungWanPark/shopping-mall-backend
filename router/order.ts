import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as orderController from "../controller/order.js";
import { isAuth } from "../middleware/auth.js";
// import { validate } from "../middleware/validator.js";

// GET /order/all
// GET /order?cartItemId=1
// GET /order?byUser=true
// GET /order?startDate=22.10.03&endDate=22.11.04

// POST /order/new

const router = express.Router();

router.get("/", isAuth, orderController.getOrder);
router.get("/all", isAuth, orderController.getAllOrders);
router.post("/new", isAuth, orderController.createOrder);

export default router;
