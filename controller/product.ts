import * as productAPIS from "../apis/product.js";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ProductInfo } from "../types/product.js";

export async function getProducts(req: Request, res: Response) {
    const category = req.query.category as string;
    const keyword = req.query.keyword as string;
    const page = parseInt((req.query.page as string) || "1", 10);
    let data;

    if (keyword) {
        data = await getProductByKeyword(keyword, page);
    } else if (category === "all" || category == "null") {
        data = await productAPIS.getAll(page);
    } else if (category === "allWithoutPage") {
        data = await productAPIS.getAllWithoutPage();
    } else {
        data = await productAPIS.getByCategory(category, page);
    }

    const { totalPages, products, count } = data;

    return res.status(200).json({ totalPages, products, count });
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

export async function getProductByKeyword(keyword: string, page: number) {
    const { totalPages, products, count } = await productAPIS.getAllByKeyword(
        keyword,
        page
    );
    return { totalPages, products, count };
}
