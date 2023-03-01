import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validator.js';
import { isAuth } from '../middleware/auth.js';

// GET /tweets
// GET /tweets?username=username
// GET /tweets/:id
// POST /tweets
// PUT /tweets/:id
// DELETE /tweets/:id
const validateCredential = [
  body('username')
    .trim()
    .isLength({ min: 2 })
    .withMessage('username should be at least 2 charactors'),
  body('password')
    .trim()
    .isLength({ min: 4 })
    .withMessage('password should be at least 4 charactors'),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body('name').trim().notEmpty().withMessage('name should not be empty'),
  body('email').isEmail().normalizeEmail().withMessage('invalid email'),
  body('url')
    .optional({
      nullable: true,
      checkFalsy: true,
    })
    .trim()
    .isURL()
    .withMessage('invalid URL'),
  validate,
];

const router = express.Router();

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.post('/logout', authController.logout);

router.get('/me', isAuth, authController.me);

router.get('/csrf-token', authController.csrfToken);

export default router;
