import { Order } from "./../models/Order.js";
import { CartItemType } from "../types/cart.js";
import { Op } from "sequelize";
import * as cartAPIS from "../apis/cart.js";
import { CartItem } from "./../models/CartItem.js";

export async function createOrder(userId: number, cartItemId: number) {
    return await Order.create({
        userId,
        cartItemId,
    });
}

export async function getAllOrders() {
    return await Order.findAll();
}

export async function getOrdersByUserId(userId: number) {
    return await Order.findAll({
        where: {
            userId,
        },
    });
}

export async function getOrderByCartItemId(cartItemId: number) {
    return await Order.findOne({
        where: {
            cartItemId,
        },
    });
}

export async function getOrdersByDate(startDate: Date, endDate: Date) {
    return await Order.findAll({
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate],
            },
        },
    });
}
