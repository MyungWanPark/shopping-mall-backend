import { sequelize } from "../db/database.js";
import {
    Sequelize,
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

interface ProductModel
    extends Model<
        InferAttributes<ProductModel>,
        InferCreationAttributes<ProductModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number;
    name?: string;
    category?: string;
    imgURL?: string;
    price?: number;
    description?: string;
    colors?: string;
}

export const Product = sequelize.define<ProductModel>(
    "product",
    {
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
        imgURL: {
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
            defaultValue: JSON.stringify(["white", "black", "navy", "gray"]),
            allowNull: false,
        },
    },
    {
        charset: "utf8mb4 ",
        collate: "utf8mb4_general_ci",
    }
);
