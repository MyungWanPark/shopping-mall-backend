import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as userRepository from '../data/userRepository.js';

const AUTH_ERROR = { message: 'Authenication Error' };

export const isAuth = async (req, res, next) => {
  let token;
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    token = req.cookies['token'];
  }

  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = decoded.id;
    req.token = token;
    next();
  });
};
