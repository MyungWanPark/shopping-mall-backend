import { User } from "../models/User.js";
import { UserInfo } from "../types/user.js";

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
