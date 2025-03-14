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
import * as cartRepository from "../apis/cart.js";
import { AuthRequest } from "../types/auth.js";

export async function register(
    req: Request & { userId?: number; token?: string },
    res: Response,
    next: NextFunction
) {
    const { email, password: pw, age, gender, name, inflowRoute } = req.body;
    const found = await userRepository.findByEmail(email);

    if (found) {
        return res.status(409).json({ message: `${email} already exists` });
    }
    const hashed = await bcrypt.hash(pw, config.bcrypt.saltRounds);

    const userId = await userRepository.createUser({
        email,
        password: hashed,
        age,
        gender,
        name,
        inflowRoute,
    });
    cartRepository.createCart(userId!);
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
    const { password, ...userInfo } = user;
    return res.status(201).json({ token, user: userInfo });
    // return res.status(201).json({ token, email });
}

export async function login(
    req: Request & { userId?: number; token?: string },
    res: Response,
    next: NextFunction
) {
    const { email, password: pw } = req.body as {
        email: string;
        password: string;
    };
    const user = await userRepository.findByEmail(email);

    if (!user) {
        return res.status(401).json({ message: "Invalid user" });
    }
    const isValidPassword = await bcrypt.compare(pw, user.password!);

    if (!isValidPassword) {
        return res.status(401).json({ message: "invalid password" });
    }
    const token = createJWTToken(user.id!);
    setToken(res, token);

    const { password, ...userInfo } = user.dataValues;
    res.status(200).json({ token, user: userInfo });
}

export async function kakaoLogin(req: Request, res: Response) {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}`;
    return res.json({ url: kakaoAuthURL });
}

export async function kakaoCallback(req: Request, res: Response) {
    const code = req.query.code as string;
    console.log("code in kakaoCallback = ", code);
    try {
        const tokenResponse = await fetch(
            "https://kauth.kakao.com/oauth/token",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=utf-8",
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: `${process.env.CLIENT_ID}`,
                    redirect_uri: `${process.env.REDIRECT_URI}`,
                    code: code,
                    client_secret: `${process.env.CLIENT_SECRET}`,
                }).toString(),
            }
        );

        if (!tokenResponse.ok) throw new Error("Failed to fetch access token");
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=utf-8",
            },
        });
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();

        console.log("userData = ", userData);
    } catch (e) {}

    return res.json({ message: "success" });
}

export async function logout(req: Request, res: Response, next: NextFunction) {
    res.cookie("token", "");
    res.status(200).json({ message: "User has been logged out" });
}

export async function me(req: AuthRequest, res: Response, next: NextFunction) {
    const user = await userRepository.findById(req.userId!);
    if (!user) {
        return res.status(404).json({ message: "User not found " });
    }
    const { password, ...userInfo } = user.dataValues;
    res.status(200).json({ token: req.token, user: userInfo });
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
