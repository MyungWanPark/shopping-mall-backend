import { Order } from "sequelize";
import { Cart } from "../models/Cart.js";
import { CartItem } from "../models/CartItem.js";
import { CartItemType } from "../types/cart.js";
import { ProductInfo } from "../types/product.js";
import { findById as findUserById } from "./user.js";

const ORDER_DESC: {
    order: Order;
} = {
    order: [["createdAt", "DESC"]],
};

export async function getCartByUserId(userId: number) {
    return await Cart.findOne({
        where: {
            userId,
        },
    });
}

export async function createCart(userId: number) {
    return await Cart.create({ userId });
}

export async function addToCart(userId: number, product: CartItemType) {
    let cart = await getCartByUserId(userId);
    if (!cart) {
        createCart(userId).then((data) => (cart = data));
    }
    return await CartItem.create({
        quantity: product.quantity,
        color: product.color,
        size: product.size,
        totalPricePerProduct: product.productPrice! * product.quantity!,
        cartId: cart!.id,
        productId: product.productId,
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
