import dotenv from "dotenv";
dotenv.config();

function required(key: string, defaultValue?: number) {
    const value = process.env[key] || defaultValue;
    if (value == null) {
        throw new Error(`key ${key} is undefined in environment variable`);
    }
    return value.toString();
}

export const config = {
    jwt: {
        secretKey: required("JWT_SECRET_KEY"),
        expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
    },
    port: parseInt(required("PORT", 8080)),
    db: {
        host: required("DB_HOST"),
        user: required("DB_USER"),
        password: required("DB_PASSWORD"),
        database: required("DB_DATABASE"),
        port: parseInt(required("DB_PORT")),
    },
    cors: {
        allowedOrigin: required("CORS_ALLOW_ORIGIN").split(" "),
    },
    csrf: {
        plainToken: required("CSRF_SECRET_KEY"),
    },
    rateLimit: {
        windowMS: required("RATE_LIMIT_WINDOW_MS"),
        maxRequest: required("MAX_REQUEST"),
    },
};
