"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing core modules
const express_1 = __importDefault(require("express"));
// importing config
const config_1 = __importDefault(require("./config/config"));
// importing third party modules
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const csurf_1 = __importDefault(require("csurf"));
const connect_flash_1 = __importDefault(require("connect-flash"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const csrfProtection = (0, csurf_1.default)({ cookie: true });
// initializing express app
const app = (0, express_1.default)();
// setting view engine and static files directory
app.set("view engine", "ejs");
app.use(express_1.default.static('./public'));
// passport strategy
const passport_2 = __importDefault(require("./config/passport"));
(0, passport_2.default)(passport_1.default);
// setting session and cookie parser 
app.use((0, cookie_parser_1.default)('dsf5ds5f5dsfd'));
app.use((0, express_session_1.default)({
    secret: 'dsf5ds5f5dsfd',
    resave: true,
    saveUninitialized: true
}));
app.use((0, connect_flash_1.default)());
//passport extra
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    res.locals.message = req.flash('message');
    res.locals.user = req.user;
    next();
});
//custom csrf message
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN')
        return next(err);
    // handle CSRF token errors here
    res.status(403);
    res.send('unauthorised access');
});
//setting body parser
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, express_fileupload_1.default)({
    createParentPath: true
}));
// importing controllers
const collegeLogin_1 = __importDefault(require("./controllers/collegeLogin"));
const dashboard_1 = __importDefault(require("./controllers/dashboard"));
const information_1 = __importDefault(require("./controllers/information"));
const college_1 = __importDefault(require("./controllers/college"));
const exam_1 = __importDefault(require("./controllers/exam"));
//importing middlewares
const isAuth_1 = __importDefault(require("./config/isAuth"));
const notAuth_1 = __importDefault(require("./config/notAuth"));
const isCollege_1 = __importDefault(require("./config/isCollege"));
const isStudent_1 = __importDefault(require("./config/isStudent"));
// Routes
//college user login
app.route('/')
    .get(notAuth_1.default, csrfProtection, collegeLogin_1.default.view)
    .post(notAuth_1.default, csrfProtection, collegeLogin_1.default.post);
//logout
app.get('/logout', (req, res, next) => {
    req.logout(() => {
        res.redirect('/');
    });
});
// users redirection
app.route('/dashboard')
    .get(isAuth_1.default, csrfProtection, dashboard_1.default.view);
// college user
app.route('/college')
    .get(isCollege_1.default, csrfProtection, college_1.default.view)
    .post(isCollege_1.default, csrfProtection, college_1.default.post);
//
app.route('/college/exam/:uniqid')
    .get(isCollege_1.default, csrfProtection, exam_1.default.view)
    .post(isCollege_1.default, csrfProtection, exam_1.default.post);
// student user
app.route('/information')
    .get(isStudent_1.default, csrfProtection, information_1.default.view)
    .post(isStudent_1.default, csrfProtection, information_1.default.post);
// starting server
app.listen(config_1.default.server.port, () => console.log("server is running"));
//generating tables
const init_1 = __importDefault(require("./database/init"));
(0, init_1.default)();
