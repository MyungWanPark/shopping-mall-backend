import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { UserInfo } from "../types/user.js";
import {
    Sequelize,
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
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
}

export const User = sequelize.define<UserModel>("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    age: {
        type: DataTypes.TEXT,
    },
    inflowRoute: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export async function findByEmail(email: string) {
    return await User.findOne({
        where: {
            email,
        },
    });
}

export async function findById(id: number) {
    return await User.findByPk(id);
}

export async function createUser(user: UserInfo) {
    return User.create(user).then((data) => data.dataValues.id);
}
