import { Request } from "express";

export type AuthRequest = Request & {
    userId?: number;
    token?: string;
};
