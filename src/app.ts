// importing core modules
import express, {Application, NextFunction, Request, Response} from 'express';

// importing config
import config from './config/config';


// importing third party modules
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import flash from "connect-flash"
import fileUpload from 'express-fileupload';

const csrfProtection=csurf({cookie:true});


// initializing express app
const app: Application = express();

// setting view engine and static files directory
app.set("view engine","ejs")
app.use(express.static('./public'))


// passport strategy
import strategy from "./config/passport"
strategy(passport)

// setting session and cookie parser 
app.use(cookieParser('dsf5ds5f5dsfd'));
app.use(session({
    secret:'dsf5ds5f5dsfd',
    resave:true,
    saveUninitialized:true
}));
app.use(flash())


//passport extra
app.use(passport.initialize());
app.use(passport.session());


 //global variables
 app.use((req:Request, res:Response, next:NextFunction)=>{
    res.locals.success_msg= req.flash('success_msg');
    res.locals.error= req.flash('error');
    res.locals.message= req.flash('message');
    res.locals.user = req.user
    next();
});


//custom csrf message
app.use(function (err:any, req:Request, res:Response, next:NextFunction) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
   
    // handle CSRF token errors here
    res.status(403)
    res.send('unauthorised access');
});


//setting body parser
app.use(express.urlencoded({limit:'10mb',extended: true }));
app.use(express.json({limit:'10mb'}));
app.use(fileUpload({
    createParentPath: true
}));


// importing controllers
import collegeLogincontroller from "./controllers/collegeLogin";
import dashboardController from "./controllers/dashboard";
import informationController from "./controllers/information";
import collegeController from "./controllers/college";
import Exam from "./controllers/exam";


//importing middlewares
import isAuth from "./config/isAuth";
import notAuth from "./config/notAuth";
import isCollege from "./config/isCollege";
import isStudent from "./config/isStudent"

// Routes

//college user login
app.route( '/' )
.get( notAuth, csrfProtection, collegeLogincontroller.view )
.post( notAuth, csrfProtection, collegeLogincontroller.post )

//logout
app.get('/logout',(req:any,res:Response,next:NextFunction)=>{
    req.logout(()=>{
        res.redirect('/');
    });
})

// users redirection
app.route( '/dashboard' )
.get( isAuth, csrfProtection, dashboardController.view )


// college user
app.route( '/college' )
.get( isCollege, csrfProtection, collegeController.view )
.post( isCollege, csrfProtection, collegeController.post )

//
app.route('/college/exam/:uniqid')
.get(isCollege, csrfProtection, Exam.view)
.post(isCollege, csrfProtection, Exam.post)


// student user
app.route('/information')
.get( isStudent, csrfProtection, informationController.view )
.post( isStudent, csrfProtection, informationController.post )



// starting server
app.listen(config.server.port,()=> console.log("server is running"));


//generating tables
import dbInit from './database/init';
dbInit();




