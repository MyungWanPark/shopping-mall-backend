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

export async function getCartItems(req: AuthRequest, res: Response) {
    const userId = req.userId as number;

    const cartId = await cartAPIS
        .getCartByUserId(userId)
        .then((cart) => cart?.id);

    const cartItems = await cartAPIS.getCartItemsByCartId(cartId!);
    res.status(200).json(cartItems);
}

export async function addCart(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const cartItemBody: CartItemType = req.body;
    const isExist = await cartAPIS.getCartItemByProductId(
        cartItemBody.productId!
    );
    // console.log(`isExist in addCart = ${JSON.stringify(isExist)}`);
    if (isExist && !isExist.isOrdered) {
        return updateCartItem(req, res);
    }
    const cartItemInfo = await cartAPIS.addToCart(userId, cartItemBody);
    res.status(200).json(cartItemInfo);
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
