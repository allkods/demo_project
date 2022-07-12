"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const view = (req, res, next) => {
    if (req.user.type == '0') {
        return res.redirect('/information');
    }
    else {
        return res.redirect('/college');
    }
};
exports.default = { view };
