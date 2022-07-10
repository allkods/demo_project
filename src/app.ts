// importing express
import express, {Application} from 'express';
import config from './config/config';
import dbInit from './database/init';

//importing controllers
import homeController  from './controllers/home';
import signupController from './controllers/signup';
import loginController from './controllers/login';

const app: Application = express();

// setting view engine and static files directory
app.set("view engine","ejs")
app.use(express.static('./public'))

app.use(express.urlencoded({limit:'10mb',extended: true }));
app.use(express.json({limit:'10mb'}));


// Routes
app.get('/',homeController.view);

app.route('/signup')
.get(signupController.view)
.post(signupController.post)

app.route('/login')
.get(loginController.view)
.post(loginController.post)


// starting server
app.listen(config.server.port,()=> console.log("server is running"));


//generating database tables
dbInit();


