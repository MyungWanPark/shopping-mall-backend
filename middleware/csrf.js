import bcrypt from 'bcrypt';
import { config } from '../config.js';

export const csrfCheck = (req, res, next) => {
  if (
    req.method === 'GET' ||
    req.method === 'OPTIONS' ||
    req.method === 'HEAD'
  ) {
    return next();
  }

  const csrfHeader = req.get('twitter-csrf-token');

  if (!csrfHeader) {
    console.warn(`Missing required twitter csrf header ${req.headers.origin}`);
    return res.status(403).json({ message: 'Failed CSRF check' });
  }

  validateCsrfToken(csrfHeader) //
    .then((isValid) => {
      if (!isValid) {
        console.warn(
          `Value provided in twitter csrf token header(${csrfHeader}) does not validate ${req.headers.origin}`
        );
        return res.status(403).json({ message: 'Failed CSRF check' });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: 'Something went wrong' });
    });
};

async function validateCsrfToken(csrfHeader) {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
}
