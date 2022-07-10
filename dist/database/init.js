"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("./models/Users"));
// const isDev = process.env.NODE_ENV === 'development'
const dbInit = () => {
    Users_1.default.sync({ alter: true });
};
exports.default = dbInit;
