import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import {
    Sequelize,
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    ForeignKey,
} from "sequelize";

interface UserModel
    extends Model<
        InferAttributes<UserModel>,
        InferCreationAttributes<UserModel>
    > {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: number;
    email?: string;
    password?: string;
    name?: string;
    gender?: string;
    age?: string;
    inflowRoute?: string;
    isAdmin?: boolean;
    cartId?: ForeignKey<number>;
    createdAt?: Date;
    kakaoId?: string;
}

export const User = sequelize.define<UserModel>(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        age: {
            type: DataTypes.TEXT,
        },
        inflowRoute: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        kakaoId: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
        },
    },
    {
        charset: "utf8mb4 ",
        collate: "utf8mb4_general_ci",
    }
);
