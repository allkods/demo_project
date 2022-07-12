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
const connection_1 = __importDefault(require("./connection"));
const College_Users_1 = __importDefault(require("./models/College_Users"));
const Colleges_1 = __importDefault(require("./models/Colleges"));
const College_Addresses_1 = __importDefault(require("./models/College_Addresses"));
const Exams_1 = __importDefault(require("./models/Exams"));
const dbInit = () => {
    // Syncing sequelize
    connection_1.default.sync({ force: true })
        .then(result => {
        // Inserting hard coded data to database
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const cu = yield College_Users_1.default.create({
                email: 'sahilrajkashyap4@gmail.com',
                password: '$2a$10$oUZGqfqf6YvZVTQ5knd/JO2DUisws.9q.FWlgaSNo5GAzKISB9Oi.',
                type: '1'
            });
            const college = yield Colleges_1.default.create({
                uniqid: "2154785212",
                name: "Sinhgad Institute of Management And Computer Application",
                image: "/images/colleges/225412.jpeg",
                uid: cu.id
            });
            const add = yield College_Addresses_1.default.create({
                state: "maharashtra",
                city: "pune",
                pin: "411041",
                landmark: "Opposite Bank of Maharashtra, Narhe",
                cid: college.id
            });
            const exam = yield Exams_1.default.create({
                uniqid: "225478",
                name: "logica",
                image: "/images/exams/025461.jpg",
                starting: new Date("2022-07-15 12:01:01"),
                duration: "120",
                cid: college.id
            });
        }))();
    })
        .catch(err => {
        console.log(err);
    });
};
exports.default = dbInit;
