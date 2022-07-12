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
const Users_1 = __importDefault(require("../database/models/Users"));
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const College_Users_1 = __importDefault(require("../database/models/College_Users"));
exports.default = (passport) => {
    passport.use('college-login', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield College_Users_1.default.findOne({ where: { email: email } });
            if (user === null) {
                return done(null, false, { message: 'emailerr' });
            }
            else {
                bcryptjs_1.default.compare(password, user.password, (err, match) => {
                    if (err)
                        throw err;
                    if (match) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: "passerr" });
                    }
                });
            }
        }))();
    }));
    passport.use('student-login', new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield Users_1.default.findOne({ where: { email: email } });
            if (user === null) {
                return done(null, false, { message: 'emailerr' });
            }
            else {
                bcryptjs_1.default.compare(password, user.password, (err, match) => {
                    if (err)
                        throw err;
                    if (match) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, { message: "passerr" });
                    }
                });
            }
        }))();
    }));
    passport.serializeUser((req, user, done) => {
        done(undefined, user);
    });
    passport.deserializeUser((current, done) => {
        if (current.type == '1') {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield College_Users_1.default.findOne({ where: { id: current.id } });
                if (user === null)
                    done("Error: Deserialization", user);
                else
                    done(null, user);
            }))();
        }
        else if (current.type == '0') {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield Users_1.default.findOne({ where: { id: current.id } });
                if (user === null)
                    done("Error: Deserialization", user);
                else
                    done(null, user);
            }))();
        }
    });
};
