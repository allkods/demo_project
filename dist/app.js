"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// importing express
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const init_1 = __importDefault(require("./database/init"));
//importing controllers
const home_1 = __importDefault(require("./controllers/home"));
const signup_1 = __importDefault(require("./controllers/signup"));
const login_1 = __importDefault(require("./controllers/login"));
const app = (0, express_1.default)();
// setting view engine and static files directory
app.set("view engine", "ejs");
app.use(express_1.default.static('./public'));
app.use(express_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use(express_1.default.json({ limit: '10mb' }));
// Routes
app.get('/', home_1.default.view);
app.route('/signup')
    .get(signup_1.default.view)
    .post(signup_1.default.post);
app.route('/login')
    .get(login_1.default.view)
    .post(login_1.default.post);
// starting server
app.listen(config_1.default.server.port, () => console.log("server is running"));
//generating database tables
(0, init_1.default)();
