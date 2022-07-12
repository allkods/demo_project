"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const view = (req, res, next) => {
    res.render('login', { csrfToken: req.csrfToken() });
};
const post = (req, res, next) => {
    var rdr = req.body.rdr;
    var success = "";
    if (rdr != undefined && rdr != "") {
        success = JSON.parse(Buffer.from(rdr, 'base64').toString()).path;
    }
    else {
        success = '/dashboard';
    }
    passport_1.default.authenticate('college-login', {
        successRedirect: success,
        failureRedirect: `/?redirect=${rdr}`,
        failureFlash: true
    })(req, res, next);
};
exports.default = { view, post };
