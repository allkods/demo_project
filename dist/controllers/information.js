"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view = (req, res, next) => {
    res.render('information');
};
const post = (req, res, next) => {
    res.end("todo");
};
exports.default = { view, post };
