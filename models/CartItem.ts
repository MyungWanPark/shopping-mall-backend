import { sequelize } from "../db/database.js";
import {
    Sequelize,
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize";

interface CartItemModel
    extends Model<
        InferAttributes<CartItemModel>,
        InferCreationAttributes<CartItemModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number;
    isSelected?: boolean;
    quantity?: number;
    color?: string;
    size?: string;
    totalPricePerProduct?: number;
    cartId?: ForeignKey<number>;
    productId?: ForeignKey<number>;
}

export const CartItem = sequelize.define<CartItemModel>("cartItem", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    isSelected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    size: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    totalPricePerProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
