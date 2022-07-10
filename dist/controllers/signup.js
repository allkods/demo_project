"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../database/dal/users");
const view = (req, res, next) => {
    res.locals.error = req.query;
    return res.render('signup');
};
const post = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.redirect('/signup?error=2');
    }
    (0, users_1.signup)({ email: email, password: password })
        .then(data => {
        res.json({
            status: "success",
            data: data
        });
    });
};
exports.default = { view, post };
