"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const sequelize = new sequelize_1.Sequelize(config_1.default.mysql.database, config_1.default.mysql.user, config_1.default.mysql.password, {
    host: config_1.default.mysql.host,
    dialect: config_1.default.mysql.dialect,
    logging: false
});
exports.default = sequelize;
