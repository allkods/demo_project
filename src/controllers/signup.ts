import { Request, Response, NextFunction } from "express";
import { signup } from "../database/dal/users";

const view = (req: Request,res: Response,next: NextFunction)=>{

    res.locals.error = req.query;
    return res.render('signup');

}

const post = (req: Request,res: Response,next: NextFunction)=>{

    const { email, password } = req.body;

    if(!email || !password){
        return res.redirect('/signup?error=2')
    }

    signup({email:email,password:password})
    .then(data =>{
        res.json({
            status:"success",
            data:data
        });
    });
}


export default { view, post }