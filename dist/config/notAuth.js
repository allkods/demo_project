"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function notAuth(req, res, next) {
    if (!req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    }
    else {
        res.redirect('/dashboard');
    }
}
exports.default = notAuth;
