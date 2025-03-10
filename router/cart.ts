import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as cartController from "../controller/cart.js";
import { isAuth } from "../middleware/auth.js";
// import { validate } from "../middleware/validator.js";

// GET /cart/:userId

// POST /cart/new

// PUT /cart/:id

// DELETE /cart/:id

const router = express.Router();

router.get("/", cartController.getCartItemsByDate);
router.get("/all", isAuth, cartController.getAllCartItems);
router.post("/add", isAuth, cartController.addCart);
router.post("/sync", isAuth, cartController.syncCart);
// router.post("/new", isAuth, cartController.createCart);
router.put("/update", isAuth, cartController.updateCartItem);
router.delete("/delete", isAuth, cartController.deleteCartItem);

export default router;
