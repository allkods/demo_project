"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../connection"));
const Exams_1 = __importDefault(require("./Exams"));
const Questions = connection_1.default.define('questions', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    question: {
        type: sequelize_1.DataTypes.STRING(3000),
        allowNull: false
    },
    a: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    b: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    c: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    d: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    answer: {
        type: sequelize_1.DataTypes.CHAR(2),
        allowNull: false
    },
    marks: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false
    },
    examId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        references: { model: 'exams', key: 'id' }
    }
}, {
    timestamps: true
});
Exams_1.default.hasMany(Questions, { foreignKey: 'examId' });
exports.default = Questions;
