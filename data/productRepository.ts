import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import {
    Sequelize,
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";
import { ProductInfo } from "../types/product.js";

const ORDER_DESC = {
    order: ["createdAt", "DESC"],
};

interface ProductModel
    extends Model<
        InferAttributes<ProductModel>,
        InferCreationAttributes<ProductModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number;
    name?: string;
    category?: string;
    imageURL?: string;
    price?: number;
    description?: string;
    colors?: string;
}

export const Product = sequelize.define<ProductModel>("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    imageURL: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "product description 입니다.",
    },
    colors: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
});

export async function getByName(name: string) {
    return Product.findOne({
        where: {
            name,
        },
    });
}

export async function getAll() {
    return Product.findAll({
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

export async function getAllByCategory(category: string) {
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
    return Product.create(product).then((data) => data.dataValues.id);
}

export async function updateById({
    id,
    name,
    category,
    imageURL,
    price,
    description,
}: ProductInfo) {
    return Product.findByPk(id).then((product) => {
        product!.name = name;
        product!.category = category;
        product!.imageURL = imageURL;
        product!.price = price;
        product!.description = description;
        return product!.save();
    });
}

export async function removeById(id: number) {
    return Product.findByPk(id).then((product) => product!.destroy());
}
