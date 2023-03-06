import { Order } from "sequelize";
import { Product } from "../models/Product.js";
import { ProductInfo } from "../types/product.js";

const ORDER_DESC: {
    order: Order;
} = {
    order: [["createdAt", "DESC"]],
};

export async function getByName(name: string) {
    return Product.findOne({
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

export async function getAllByName(name: string) {
    return Product.findAll({
        where: {
            name,
        },
        ...ORDER_DESC,
    });
}

export async function getByCategory(category: string) {
    return Product.findAll({
        where: {
            category,
        },
        ...ORDER_DESC,
    });
}

export async function getById(id: number) {
    return Product.findByPk(id);
}

export async function createProduct(product: ProductInfo) {
    console.log(`product = ${JSON.stringify(product)}`);
    return Product.create(product).then((data) => data.dataValues.id);
}

export async function updateById({
    id,
    name,
    category,
    imgURL,
    price,
    description,
}: ProductInfo) {
    return Product.findByPk(id).then((product) => {
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
