"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.type == '0') {
            res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
            next();
        }
        else {
            res.redirect('/dashboard');
        }
    }
    else {
        var path = req.url;
        const state = path ? Buffer.from(JSON.stringify({ path })).toString('base64') : '';
        res.redirect(`/?redirect=${state}`);
    }
}
exports.default = isAdmin;
