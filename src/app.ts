// importing core modules
import express, {Application, NextFunction, Request, Response} from 'express';

// importing config
import config from './config/config';




// initializing express app
const app: Application = express();

// setting view engine and static files directory
app.set("view engine","ejs")
app.use(express.static('./public'))



//setting body parser
app.use(express.urlencoded({limit:'10mb',extended: true }));
app.use(express.json({limit:'10mb'}));


// importing controllers
import homeController from "./controllers/home";



// Routes

//college user login
app.route( '/' )
.get(homeController.view)
.post(homeController.post)



// starting server
const server = app.listen(config.server.port,()=> console.log("server is running"));


//generating tables
import dbInit from './database/init';
dbInit();