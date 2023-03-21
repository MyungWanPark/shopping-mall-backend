import { sequelize } from "../db/database.js";
import {
    Sequelize,
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize";

interface OrderModel
    extends Model<
        InferAttributes<OrderModel>,
        InferCreationAttributes<OrderModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number;
    cartItemIds?: ForeignKey<string>;
    userId?: ForeignKey<number>;
    createdAt?: Date;
}

export const Order = sequelize.define<OrderModel>(
    "order",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },

        cartItemIds: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        charset: "utf8mb4 ",
        collate: "utf8mb4_general_ci",
    }
);
