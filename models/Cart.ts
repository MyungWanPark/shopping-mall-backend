import SQ, { ForeignKey, Order } from "sequelize";
import { sequelize } from "../db/database.js";
import {
    Sequelize,
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
} from "sequelize";

interface CartModel
    extends Model<
        InferAttributes<CartModel>,
        InferCreationAttributes<CartModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number;
    userId?: ForeignKey<number>;
}

export const Cart = sequelize.define<CartModel>("cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
});
