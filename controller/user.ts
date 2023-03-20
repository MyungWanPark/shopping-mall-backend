import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AuthRequest } from "../types/auth.js";
import * as userAPIS from "../apis/user.js";

export async function getAllUsers(req: AuthRequest, res: Response) {
    const userInfos = await userAPIS.findAllUsers();
    res.status(200).json(userInfos);
}

export async function getUsersByDate(req: AuthRequest, res: Response) {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const user = await userAPIS.findUsersByDate(startDate, endDate);
    res.status(200).json(user);
}
