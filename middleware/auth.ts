import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { config } from "../config.js";
import * as userRepository from "../apis/user.js";
import { register, login } from "../controller/auth.js";

const AUTH_ERROR = { message: "Authenication Error" };
export const ANONYMOUS_USER_IDENTIFIER = 100000;

export const isAuth = async (
    req: Request & { userId?: number; token?: string },
    res: Response,
    next: NextFunction
) => {
    let token: string | undefined;
    console.log("isAuth fired!");
    const authHeader = req.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        token = req.cookies["token"];
    }
    if (!token) {
        console.log("don't have a token in isAuth");
        const parsedIp = req.ip.replaceAll(":", "");
        const email = `anonymous${parsedIp}@com`;
        const found = await userRepository.findByEmail(email);
        req.body = {
            email: email,
            password: parsedIp,
        };
        if (found) {
            await login(req, res, next);
            return;
        }

        req.body = {
            ...req.body,
            age: 999,
            name: "anonymous",
            gender: "anonymous",
            inflowRoute: "etc",
        };
        await register(req, res, next);
        return;

        // return res.status(401).json(AUTH_ERROR);
        // return next();
    }

    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if (error) {
            console.log(`jwt.verify error ${error}`);
            return res.status(401).json(AUTH_ERROR);
        }
        const decodedPayload = decoded as { id: number };
        const user = userRepository.findById(decodedPayload.id);

        if (!user) {
            return res.status(401).json(AUTH_ERROR);
        }
        req.userId = decodedPayload.id;
        req.token = token;
        next();
    });
};
