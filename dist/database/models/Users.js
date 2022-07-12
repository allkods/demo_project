"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Exams_1 = __importDefault(require("./Exams"));
const Users = connection_1.default.define('users', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    examId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: { model: 'exams', key: 'id' }
    },
    type: {
        type: sequelize_1.DataTypes.CHAR(1),
        allowNull: false
    }
}, {
    timestamps: true,
    paranoid: true,
});
Exams_1.default.hasOne(Users, { foreignKey: 'examId' });
exports.default = Users;
