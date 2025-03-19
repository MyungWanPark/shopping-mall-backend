import { Order, Op } from "sequelize";
import { Product } from "../models/Product.js";
import { ProductInfo } from "../types/product.js";

const ORDER_DESC: {
    order: Order;
} = {
    order: [["createdAt", "DESC"]],
};

const PER_PAGE = 10;

export async function getByName(name: string) {
    return await Product.findOne({
        where: {
            name,
        },
    });
}

export async function getAllProductsForDummyData() {
    return await Product.findAll();
}

export async function getAllWithoutPage() {
    const products = await Product.findAll();
    return {
        totalPages: 0, // 임의 값
        products,
        count: 0, // 임의 값
    };
}

export async function getAll(page: number) {
    const offset = (page - 1) * PER_PAGE;
    const { count, rows } = await Product.findAndCountAll({
        limit: PER_PAGE,
        offset,
        ...ORDER_DESC,
    });

    return {
        totalPages: Math.ceil(count / PER_PAGE),
        products: rows,
        count,
    };
}

export async function getAllByKeyword(keyword: string, page: number) {
    const offset = (page - 1) * PER_PAGE;
    const { count, rows } = await Product.findAndCountAll({
        where: {
            name: {
                [Op.regexp]: `(${keyword})`,
            },
        },
        limit: PER_PAGE,
        offset,
        ...ORDER_DESC,
    });

    return {
        totalPages: Math.ceil(count / PER_PAGE),
        products: rows,
        count,
    };
}

export async function getByCategory(category: string, page: number) {
    const offset = (page - 1) * PER_PAGE;

    const { count, rows } = await Product.findAndCountAll({
        where: {
            category,
        },
        limit: PER_PAGE,
        offset,
        ...ORDER_DESC,
    });

    return {
        totalPages: Math.ceil(count / PER_PAGE),
        products: rows,
        count,
    };
}

export async function getById(id: number) {
    return await Product.findByPk(id);
}

export async function createProduct(product: ProductInfo) {
    return await Product.create(product).then((data) => data.dataValues.id);
}

export async function updateById({
    id,
    name,
    category,
    imgURL,
    price,
    description,
}: ProductInfo) {
    return await Product.findByPk(id).then((product) => {
        product!.name = name;
        product!.category = category;
        product!.imgURL = imgURL;
        product!.price = price;
        product!.description = description;
        return product!.save();
    });
}

export async function removeById(id: number) {
    return Product.findByPk(id).then((product) => product!.destroy());
}
