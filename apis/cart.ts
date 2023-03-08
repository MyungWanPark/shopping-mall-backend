import { Order } from "sequelize";
import { Cart, CartModel } from "../models/Cart.js";
import { CartItem } from "../models/CartItem.js";
import { CartItemType } from "../types/cart.js";
import { ProductInfo } from "../types/product.js";
import { findById as findUserById } from "./user.js";
import { createUser } from "./user";
const ORDER_DESC: {
    order: Order;
} = {
    order: [["createdAt", "DESC"]],
};

export async function getCartByUserId(userId: number) {
    let cart = await Cart.findOne({
        where: {
            userId,
        },
    });
    /* if (!cart) {
        await createUser({
            id?: number;
    password?: string;
    email?: string;
    name?: string;
    gender?: string;
    age?: string;
    inflowRoute?: string;
    isAdmin?: boolean;
        });
        cart = await createCart(userId);
    } */

    return cart;
}

export async function getCartItemsByCartId(cartId: number) {
    return await CartItem.findAll({
        where: {
            cartId,
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

export async function updateCartItem(
    userId: number,
    updatedItem: CartItemType
) {
    const userCart = (await getCartByUserId(userId)) as CartModel;

    return CartItem.findOne({
        where: {
            cartId: userCart.id,
            productId: updatedItem.productId,
        },
    }).then((cartItem) => {
        if (cartItem && updatedItem) {
            cartItem.quantity = updatedItem.quantity;
            cartItem.color = updatedItem.color;
            cartItem.size = updatedItem.size;
            cartItem.totalPricePerProduct =
                updatedItem.quantity! * updatedItem.productPrice!;
            return cartItem.save();
        }
    });
}

export async function deleteCartItem(userId: number, productId: number) {
    const userCart = (await getCartByUserId(userId)) as CartModel;

    return CartItem.findOne({
        where: {
            cartId: userCart.id,
            productId,
        },
    }).then((cartItem) => {
        if (cartItem) {
            cartItem.destroy();
        }
    });
}
