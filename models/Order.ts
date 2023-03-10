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
    cartItemId?: ForeignKey<number>;
    userId?: ForeignKey<number>;
    createdAt?: Date;
}

export const Order = sequelize.define<OrderModel>("order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },

    cartItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
