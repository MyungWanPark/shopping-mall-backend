import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as tweetController from '../controller/tweet.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';

// GET /tweets
// GET /tweets?username=username
// GET /tweets/:id
// POST /tweets
// PUT /tweets/:id
// DELETE /tweets/:id
const validateTweet = [
  body('text')
    .trim()
    .isLength({ min: 2 })
    .withMessage('write text at least 2 charactors'),
  validate,
];

const router = express.Router();

router.get('/', isAuth, tweetController.getTweets);

router.get('/:id', isAuth, tweetController.getTweetById);

router.post('/', isAuth, validateTweet, tweetController.createTweet);

router.put('/:id', isAuth, validateTweet, tweetController.updateTweetById);

router.delete('/:id', isAuth, tweetController.deleteTweetById);

export default router;
