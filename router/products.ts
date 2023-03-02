import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { isAuth } from "../middleware/auth.js";
// import { validate } from "../middleware/validator.js";

// GET /products
// GET /products/men
// GET /products/women
// GET /products/accessaries
// GET /products/shoes
// GET /products/:id
// GET /products/new

// POST /products/new

// PUT /products/:id
// DELETE /products/:id

const router = express.Router();

router.get("/", isAuth, tweetController.getTweets);

router.get("/:id", isAuth, tweetController.getTweetById);

router.post("/", isAuth, tweetController.createTweet);

router.put("/:id", isAuth, tweetController.updateTweetById);

router.delete("/:id", isAuth, tweetController.deleteTweetById);

export default router;
