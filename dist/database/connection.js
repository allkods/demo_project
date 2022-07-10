"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Sequelize from 'sequelize';
const config_1 = __importDefault(require("../config/config"));
// const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {host:config.mysql.host, dialect: "mysql", operatorsAliases:false}) 
const sequelize_1 = require("sequelize");
const dbName = config_1.default.mysql.database;
const dbUser = config_1.default.mysql.user;
const dbHost = config_1.default.mysql.host;
const dbDriver = config_1.default.mysql.dialect;
const dbPassword = config_1.default.mysql.password;
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    logging: false
});
exports.default = sequelizeConnection;
