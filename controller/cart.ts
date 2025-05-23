import * as cartAPIS from "../apis/cart.js";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ProductInfo } from "../types/product.js";
import { AuthRequest } from "../types/auth.js";
import { CartItemType } from "../types/cart.js";

export async function createCart(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const cartInfo = await cartAPIS.createCart(userId);
    res.status(200).json(cartInfo);
}

export async function getCart(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const cartInfo = await cartAPIS.getCartByUserId(userId);
    res.status(200).json(cartInfo);
}

export async function getAllCartItems(req: AuthRequest, res: Response) {
    const userId = req.userId as number;

    const cartId = await cartAPIS
        .getCartByUserId(userId)
        .then((cart) => cart?.id);

    const cartItems = await cartAPIS.getCartItemsByCartId(cartId!);
    res.status(200).json(cartItems);
}

export async function getCartItemsByDate(req: AuthRequest, res: Response) {
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;
    const cartInfo = await cartAPIS.getCartItemByDate(startDate, endDate);
    res.status(200).json(cartInfo);
}

export async function addCart(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const cartInfo = await cartAPIS.getCartByUserId(userId);
    const cartItemBody: CartItemType = req.body;
    const isExist = await cartAPIS.getCartItemByProductId(
        cartItemBody.productId!,
        cartInfo?.id!
    );

    if (isExist && !isExist.isOrdered) {
        return updateCartItem(req, res);
    }
    const cartItemInfo = await cartAPIS.addToCart(userId, cartItemBody);
    res.status(200).json(cartItemInfo);
}

export async function syncCart(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const { cartItems }: { cartItems: CartItemType[] } = req.body;

    if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ message: "No cart items to sync." });
    }

    const cartInfo = await cartAPIS.getCartByUserId(userId);
    if (!cartInfo) {
        return res.status(404).json({ message: "User cart not found" });
    }

    const cartId = cartInfo.id as number;

    for (const item of cartItems) {
        const cartItem = await cartAPIS.getCartItemByProductId(
            item.productId!,
            cartId
        );

        const existingItem = cartItem?.dataValues;

        if (existingItem && !existingItem.isOrdered) {
            await cartAPIS.updateCartItem(userId, {
                ...existingItem,
                quantity: existingItem.quantity! + item.quantity!,
            });
        } else {
            await cartAPIS.addToCart(userId, item);
        }
    }

    const updatedCart = await cartAPIS.getCartItemsByCartId(cartId);
    return res
        .status(200)
        .json({ message: "Cart Synchronized!", cart: updatedCart });
}

export async function updateCartItem(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const cartItemBody: CartItemType = req.body;
    const cartItemInfo = await cartAPIS.updateCartItem(userId, cartItemBody);
    res.status(200).json(cartItemInfo);
}

export async function deleteCartItem(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const { productId }: CartItemType = req.body;
    await cartAPIS.deleteCartItem(userId, productId!);
    res.sendStatus(200);
}
