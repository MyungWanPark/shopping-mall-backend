import * as productAPIS from "../apis/product.js";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ProductInfo } from "../types/product.js";

export async function getProducts(req: Request, res: Response) {
    const category = req.query.category as string;
    const keyword = req.query.keyword as string;

    if (keyword) {
        return getProductByKeyword(req, res);
    }

    const data = await (category === "all" || category === undefined
        ? productAPIS.getAll()
        : productAPIS.getByCategory(category));
    res.status(200).json(data);
}

export async function addProduct(req: Request, res: Response) {
    const productInfo: ProductInfo = req.body;
    const product = await productAPIS.createProduct(productInfo);
    res.status(201).json(product);
}

export async function getProductInfo(req: Request, res: Response) {
    const productId = req.params.id;
    const product = await productAPIS.getById(parseInt(productId));
    res.status(200).json(product);
}

export async function getProductByKeyword(req: Request, res: Response) {
    const keyword = req.query.keyword as string;
    const product = await productAPIS.getAllByKeyword(keyword);

    res.status(200).json(product);
}
/*
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
