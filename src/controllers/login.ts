import { Request, Response, NextFunction } from "express";
import { authenticate } from "../database/dal/users";
import Users, { UsersInput, UsersOutput } from "../database/models/Users";


const view = (req: Request,res: Response,next: NextFunction)=>{

    res.locals.error = req.query
    return res.render('login');

}

const post = (req: Request,res: Response,next: NextFunction)=>{

    const { email, password } = req.body;

    authenticate( { email:email, password:password } )
    .then(data => {

        res.json({
            status:"success",
            data:data
        });

    })
    .catch(error =>{
        
        if(error == "NotFound"){
            res.redirect('/login?error=email')
        }
        else if(error == "InvalidPassword"){
            res.redirect('/login?error=password')
        }
    })



}


export default { view, post }