import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { config } from "../config.js";
import * as userRepository from "../apis/user.js";

const AUTH_ERROR = { message: "Authenication Error" };

export const isAuth = async (
    req: Request & { userId?: number; token?: string },
    res: Response,
    next: NextFunction
) => {
    let token: string | undefined;
    const authHeader = req.get("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        token = req.cookies["token"];
    }
    if (!token) {
        console.log("don't have a token in isAuth");
        return res.status(401).json(AUTH_ERROR);
    }

    jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
        if (error) {
            console.log(`jwt.verify error ${error}`);
            return res.status(401).json(AUTH_ERROR);
        }
        const decodedPayload = decoded as { id: number };
        const user = userRepository.findById(decodedPayload.id);
        // console.log(`decodedPayload = ${JSON.stringify(decodedPayload)}`);

        if (!user) {
            console.log(`jwt.verify no user found error ${error}`);
            return res.status(401).json(AUTH_ERROR);
        }
        req.userId = decodedPayload.id;
        req.token = token;
        next();
    });
};
