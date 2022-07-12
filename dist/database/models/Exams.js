"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Colleges_1 = __importDefault(require("./Colleges"));
const Exams = connection_1.default.define('exams', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    uniqid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    starting: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    duration: {
        type: sequelize_1.DataTypes.CHAR(3),
        allowNull: false
    },
    cid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: { model: 'colleges', key: 'id' }
    }
}, {
    timestamps: true
});
Colleges_1.default.hasMany(Exams, { foreignKey: 'cid' });
exports.default = Exams;
