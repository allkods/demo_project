"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Colleges_1 = __importDefault(require("./Colleges"));
const College_Addresses = connection_1.default.define('college_addresses', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pin: {
        type: sequelize_1.DataTypes.CHAR(6),
        allowNull: false
    },
    landmark: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cid: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: { model: 'colleges', key: 'id' }
    }
}, {
    timestamps: true,
    paranoid: true,
});
Colleges_1.default.hasOne(College_Addresses, { foreignKey: 'cid' });
exports.default = College_Addresses;
