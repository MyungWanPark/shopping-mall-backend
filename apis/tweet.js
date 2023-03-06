import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import { User } from "./user.js";
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define("tweet", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
Tweet.belongsTo(User);

const INCLUDE_USER_QUERY = {
    attributes: [
        "id",
        "text",
        "createdAt",
        "userId",
        [Sequelize.col("user.name"), "name"],
        [Sequelize.col("user.username"), "username"],
        [Sequelize.col("user.url"), "url"],
    ],
    include: {
        model: User,
        attributes: [],
    },
};

const ORDER_DESC = {
    order: [["createdAt", "DESC"]],
};
export async function getAll() {
    return Tweet.findAll({
        ...INCLUDE_USER_QUERY,
        ...ORDER_DESC,
    });
}

export async function getByUsername(username) {
    return Tweet.findAll({
        ...INCLUDE_USER_QUERY,
        ...ORDER_DESC,
        include: {
            ...INCLUDE_USER_QUERY.include,
            where: {
                username,
            },
        },
    });
}

export async function getById(id) {
    return Tweet.findOne({
        where: { id },
        ...INCLUDE_USER_QUERY,
    });
}

export async function create(text, userId) {
    return Tweet.create({ text, userId }).then((data) =>
        getById(data.dataValues.id)
    );
}

export async function updateById(id, text) {
    return Tweet.findByPk(id, INCLUDE_USER_QUERY).then((tweet) => {
        tweet.text = text;
        return tweet.save();
    });
}

export async function removeById(id) {
    return Tweet.findByPk(id).then((tweet) => tweet.destroy());
}
