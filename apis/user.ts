import { User } from "../models/User.js";
import { UserInfo } from "../types/user.js";
import { Op } from "sequelize";

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
    return await User.create(user).then((data) => data.dataValues.id);
}

export async function findAllUsers() {
    return await User.findAll();
}

export async function findUsersByDate(startDate: string, endDate: string) {
    return await User.findAll({
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate],
            },
        },
    });
}
