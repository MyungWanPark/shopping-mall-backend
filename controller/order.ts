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
        orderBody.cartItemIds!
    );

    const orderedCartItemIds = JSON.parse(orderBody.cartItemIds!) as number[];
    const orderedCartItems = await Promise.all(
        orderedCartItemIds.map(
            async (cartItemId) => await CartItem.findByPk(cartItemId)
        )
    ).then((cartItems) => cartItems.filter((cartItem) => cartItem !== null));

    orderedCartItems.forEach(async (orderedCartItem) => {
        await cartAPIS.updateCartItem(userId, {
            ...orderedCartItem?.dataValues,
            isOrdered: true,
        });
    });

    res.status(200).json(orderInfo);
}

export async function getOrder(req: AuthRequest, res: Response) {
    const isByUserId = req.query.byUser;
    const isByPeriod = req.query.startDate;
    console.log("getOrder fired!");
    console.log(`isByPeriod = ${isByPeriod}`);
    console.log(`typeof  = ${typeof isByPeriod}`);

    if (isByUserId) {
        getOrdersByUserId(req, res);
        return;
    }
    if (isByPeriod) {
        getOrdersByDate(req, res);
        return;
    }

    return res.status(401).json("queryParms not exist");
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

export async function getOrdersByDate(req: AuthRequest, res: Response) {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const ordersInfo = await orderAPIS.getOrdersByDate(startDate, endDate);
    res.status(200).json(ordersInfo);
}
