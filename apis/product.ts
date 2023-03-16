import { Order, Op } from "sequelize";
import { Product } from "../models/Product.js";
import { ProductInfo } from "../types/product.js";

const ORDER_DESC: {
    order: Order;
} = {
    order: [["createdAt", "DESC"]],
};

export async function getByName(name: string) {
    return await Product.findOne({
        where: {
            name,
        },
    });
}

export async function getAll() {
    return await Product.findAll({
        ...ORDER_DESC,
    });
}

export async function getAllByKeyword(keyword: string) {
    return await Product.findAll({
        where: {
            name: {
                [Op.like]: "%" + keyword + "%",
            },
        },
        ...ORDER_DESC,
    });
}

export async function getByCategory(category: string) {
    return await Product.findAll({
        where: {
            category,
        },
        ...ORDER_DESC,
    });
}

export async function getById(id: number) {
    return await Product.findByPk(id);
}

export async function createProduct(product: ProductInfo) {
    console.log(`product = ${JSON.stringify(product)}`);
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
