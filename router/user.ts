import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as userController from "../controller/user.js";
// import { validate } from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", userController.getUsersByDate);
router.get("/all", userController.getAllUsers);

export default router;
