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
const xlsx_1 = __importDefault(require("xlsx"));
const Exams_1 = __importDefault(require("../database/models/Exams"));
const Questions_1 = __importDefault(require("../database/models/Questions"));
const fs_1 = __importDefault(require("fs"));
const view = (req, res, next) => {
    const examId = req.params.uniqid;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const exam = yield Exams_1.default.findOne({ where: { uniqid: examId } });
        if (exam !== null) {
            return res.render('exam', {
                csrfToken: req.csrfToken(),
                exam: exam
            });
        }
    }))();
};
const post = (req, res, next) => {
    const examId = req.params.uniqid;
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const exam = yield Exams_1.default.findOne({ where: { uniqid: examId } });
        if (exam == null) {
            return res.redirect('/');
        }
        // getting inputs
        const { qualification, participation } = req.body;
        const files = req.files;
        //error handling
        if (!qualification || !participation || !files)
            return res.redirect(`/college/exam/${examId}`);
        if (typeof qualification != "string" &&
            typeof participation != "string")
            return res.redirect(`/college/exam/${examId}`);
        //extracting file details
        const tempFile = files.file;
        const nameArr = tempFile.name.split('.');
        const ext = nameArr[nameArr.length - 1];
        const fileName = `${Math.random().toString()}.${ext}`;
        const path = `./temp/${fileName}`;
        // moving file to server
        tempFile.mv(path, (err) => {
            if (err)
                return res.status(500).send(err);
            // initiating excel file reader
            const file = xlsx_1.default.readFile(path);
            const sheet = file.SheetNames;
            const data = [];
            sheet.forEach(element => {
                const tmp = xlsx_1.default.utils.sheet_to_json(file.Sheets[element]);
                tmp.forEach(result => {
                    data.push(result);
                });
            });
            // Excel file error handler
            if (data.length < 1)
                return res.redirect(`/college/exam/${examId}`);
            var allowdKeys = ['QUESTION', 'A', 'B', 'C', 'D', 'ANSWER', 'MARKS'];
            var keys = Object.keys(data[0]);
            if (keys.length != 7)
                return res.redirect(`/college/exam/${examId}`);
            keys.forEach(element => {
                if (allowdKeys.indexOf(element) == -1)
                    return res.redirect(`/college/exam/${examId}`);
            });
            //converting json to database friendly columns
            const newdata = data.map((element) => {
                const ob = {
                    question: element.QUESTION,
                    a: element.A,
                    b: element.B,
                    c: element.C,
                    d: element.D,
                    answer: element.ANSWER.toLowerCase(),
                    marks: element.MARKS,
                    examId: exam.id
                };
                return ob;
            });
            // Inserting questions to database
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const ques = yield Questions_1.default.bulkCreate(newdata);
                // removing temp file
                fs_1.default.unlinkSync(path);
                return res.redirect(`/college/exam/${examId}?status=success`);
            }))();
        });
    }))();
};
exports.default = { view, post };
