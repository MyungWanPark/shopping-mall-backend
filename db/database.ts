import SQ from "sequelize";
import { config } from "../config.js";

const { host, user, password, port, database } = config.db;
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    port,
    dialect: "mysql",
    logging: false,
    timezone: "+09:00",
});
