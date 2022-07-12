"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const College_Users_1 = __importDefault(require("./College_Users"));
const Colleges = connection_1.default.define('colleges', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uniqid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    uid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: { model: 'college_users', key: 'id' }
    }
}, {
    timestamps: true,
    paranoid: true,
});
College_Users_1.default.hasOne(Colleges, { foreignKey: 'uid' });
exports.default = Colleges;
