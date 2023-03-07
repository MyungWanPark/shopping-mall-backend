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

export async function addCart(req: AuthRequest, res: Response) {
    const userId = req.userId as number;
    const cartItemBody: CartItemType = req.body;
    const cartItemInfo = await cartAPIS.addToCart(userId, cartItemBody);
    res.status(200).json(cartItemInfo);
}

/* export async function getTweetById(req, res) {
    const id = req.params.id;
    const tweet = await tweetRespository.getById(id);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `tweet(${id}) not found!` });
    }
}

export async function updateTweetById(req, res) {
    const id = req.params.id;
    const { text } = req.body;
    const tweet = await tweetRespository.getById(id);

    if (!tweet) {
        return res.status(404).json({ message: `Tweet not found id(${id})` });
    }

    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }
    const updatedTweet = await tweetRespository.updateById(id, text);
    res.status(200).json(updatedTweet);
}

export async function deleteTweetById(req, res) {
    const id = req.params.id;
    const tweet = await tweetRespository.getById(id);

    if (!tweet) {
        return res.status(404).json({ message: `Tweet not found id(${id})` });
    }
    if (tweet.userId !== req.userId) {
        return res.sendStatus(403);
    }
    const deletedTweet = await tweetRespository.removeById(id);
    res.status(200).json(deletedTweet);
} */
