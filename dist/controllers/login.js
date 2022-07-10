"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../database/dal/users");
const view = (req, res, next) => {
    res.locals.error = req.query;
    return res.render('login');
};
const post = (req, res, next) => {
    const { email, password } = req.body;
    (0, users_1.authenticate)({ email: email, password: password })
        .then(data => {
        res.json({
            status: "success",
            data: data
        });
    })
        .catch(error => {
        if (error == "NotFound") {
            res.redirect('/login?error=email');
        }
        else if (error == "InvalidPassword") {
            res.redirect('/login?error=password');
        }
    });
};
exports.default = { view, post };
