import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as productController from "../controller/product.js";
import { isAuth } from "../middleware/auth.js";
// import { validate } from "../middleware/validator.js";

// GET /products
// GET /products/men
// GET /products/women
// GET /products/bag
// GET /products/shoes
// GET /products/:id
// GET /products/new

// POST /products/new

// PUT /products/:id
// DELETE /products/:id

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductInfo);
router.post("/new", productController.addProduct);

export default router;
