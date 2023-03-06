import { Order } from "sequelize";
import { Cart } from "../models/Cart.js";

const ORDER_DESC: {
    order: Order;
} = {
    order: [["createdAt", "DESC"]],
};

export async function getCartByUserId(userId: number) {
    return Cart.findOne({
        where: {
            userId,
        },
    });
}

/* export async function changeItemFromCart(userId: string, product: ProductInfo) {
    return Cart.findOne({
        where: {
            userId,
        },
    }).then((cart) => {
        cart = 
        return tweet.save();
      });
} */
