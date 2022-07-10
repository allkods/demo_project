"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.authenticate = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const authenticate = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield Users_1.default.findOne({ where: { email: payload.email } });
            if (data) {
                if (data.password == payload.password) {
                    resolve(data);
                }
                else {
                    reject('InvalidPassword');
                }
            }
            else {
                reject("NotFound");
            }
        }))();
    });
});
exports.authenticate = authenticate;
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const data = yield Users_1.default.create({ email: payload.email, password: payload.password });
            resolve(data);
        }))();
    });
});
exports.signup = signup;
