import { Order } from "sequelize";
import { Cart, CartModel } from "../models/Cart.js";
import { CartItem } from "../models/CartItem.js";
import { CartItemType } from "../types/cart.js";
import { ProductInfo } from "../types/product.js";
import { findById as findUserById } from "./user.js";
import { createUser } from "./user";
import { getById as getProductById } from "./product.js";
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
    const productStaticInfo = await getProductById(product.productId!);

    return await CartItem.create({
        quantity: product.quantity,
        color: product.color,
        size: product.size,
        totalPricePerProduct: productStaticInfo?.price! * product.quantity!,
        cartId: cart!.id,
        productId: product.productId,
    });
}

export async function updateCartItem(
    userId: number,
    updatedItem: CartItemType
) {
    const userCart = (await getCartByUserId(userId)) as CartModel;
    const productStaticInfo = await getProductById(updatedItem.productId!);

    return CartItem.findOne({
        where: {
            cartId: userCart.id,
            productId: updatedItem.productId,
        },
    }).then((cartItem) => {
        if (cartItem && updatedItem) {
            cartItem.isSelected = updatedItem.isSelected;
            cartItem.quantity = updatedItem.quantity;
            cartItem.color = updatedItem.color;
            cartItem.size = updatedItem.size;
            cartItem.totalPricePerProduct =
                updatedItem.quantity! * productStaticInfo?.price!;
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
