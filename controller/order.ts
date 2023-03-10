import * as orderAPIS from "../apis/order.js";
import * as cartAPIS from "../apis/cart.js";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { AuthRequest } from "../types/auth.js";
import { OrderType } from "../types/order.js";
import { CartItem } from "./../models/CartItem.js";

export async function createOrder(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const orderBody: OrderType = req.body;
    const orderInfo = await orderAPIS.createOrder(
        userId,
        orderBody.cartItemId!
    );
    const existingCartItem = await CartItem.findByPk(orderBody.cartItemId);
    console.log(
        `existingCartItem in createOrder = ${JSON.stringify(existingCartItem)}`
    );
    console.log(
        `tobeUpdated in createOrder = ${JSON.stringify({
            ...existingCartItem?.dataValues,
            isOrdered: true,
        })}`
    );
    await cartAPIS.updateCartItem(userId, {
        ...existingCartItem?.dataValues,
        isOrdered: true,
    });
    res.status(200).json(orderInfo);
}

export async function getOrder(req: AuthRequest, res: Response) {
    const isByCartItem = req.query.cartItemId;
    const isByUserId = req.query.byUser;
    const isByPeriod = req.query.startDate;

    if (isByCartItem) {
        getOrderByCartItemId(req, res);
        return;
    }
    if (isByUserId) {
        getOrdersByUserId(req, res);
        return;
    }
    if (isByPeriod) {
        getOrdersByDate(req, res);
        return;
    }
}

export async function getAllOrders(req: AuthRequest, res: Response) {
    const orderInfos = await orderAPIS.getAllOrders();
    res.status(200).json(orderInfos);
}

export async function getOrdersByUserId(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const orderInfos = await orderAPIS.getOrdersByUserId(userId);
    res.status(200).json(orderInfos);
}

export async function getOrderByCartItemId(req: AuthRequest, res: Response) {
    const cartItemId = req.query.cartItemId as string;
    const orderInfo = await orderAPIS.getOrderByCartItemId(
        parseInt(cartItemId)
    );
    res.status(200).json(orderInfo);
}

export async function getOrdersByDate(req: AuthRequest, res: Response) {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const ordersInfo = await orderAPIS.getOrdersByDate(
        new Date(startDate),
        new Date(endDate)
    );
    res.status(200).json(ordersInfo);
}
