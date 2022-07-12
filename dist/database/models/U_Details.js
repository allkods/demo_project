"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Users_1 = __importDefault(require("./Users"));
const U_Details = connection_1.default.define('u_details', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    college: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: sequelize_1.DataTypes.CHAR(10),
        allowNull: true
    },
    stream: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    qualification: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    participation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: { model: 'users', key: 'id' }
    }
}, {
    timestamps: true,
    paranoid: true
});
Users_1.default.hasOne(U_Details, { foreignKey: 'userId' });
exports.default = U_Details;
