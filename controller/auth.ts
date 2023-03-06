import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    Request,
    Response,
    NextFunction,
    ErrorRequestHandler,
    CookieOptions,
} from "express";
import { config } from "../config.js";
import * as userRepository from "../apis/user.js";

type AuthRequest = Request & {
    userId?: number;
    token?: string;
};

export async function register(req: Request, res: Response) {
    const { email, password, age, gender, name, inflowRoute } = req.body;
    const found = await userRepository.findByEmail(email);
    if (found) {
        return res.status(409).json({ message: `${email} already exists` });
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);

    const userId = await userRepository.createUser({
        email,
        password: hashed,
        age,
        gender,
        name,
        inflowRoute,
    });
    const user = {
        email,
        password: hashed,
        age,
        gender,
        name,
        inflowRoute,
    };
    const token = createJWTToken(userId!);
    setToken(res, token);
    return res.status(201).json({ token, user });
}

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);

    if (!user) {
        return res.status(401).json({ message: "Invalid user" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password!);

    if (!isValidPassword) {
        return res.status(401).json({ message: "invalid password" });
    }
    const token = createJWTToken(user.id!);
    setToken(res, token);
    return res.status(200).json({ token, user });
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    res.cookie("token", "");
    res.status(200).json({ message: "User has been logged out" });
}

export async function me(req: AuthRequest, res: Response, next: NextFunction) {
    const user = await userRepository.findById(req.userId!);
    // console.log(`user in me() = ${JSON.stringify(user)}`);
    if (!user) {
        return res.status(404).json({ message: "User not found " });
    }
    res.status(200).json({ token: req.token, user });
}

function createJWTToken(id: number) {
    return jwt.sign({ id }, config.jwt.secretKey, {
        expiresIn: config.jwt.expiresInSec,
    });
}

function setToken(res: Response, token: string) {
    const options: CookieOptions = {
        maxAge: config.jwt.expiresInSec * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
    };
    res.cookie("token", token, options);
}

export async function csrfToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const csrfToken = await generateCSRFToken();
    res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
    return bcrypt.hash(config.csrf.plainToken, 1);
}
