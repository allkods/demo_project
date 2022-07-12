import { Request, Response, NextFunction } from "express";
import passport from "passport"

const view = (req: Request,res: Response,next: NextFunction)=>{
    
    res.render('login',{csrfToken:req.csrfToken()})
}

const post = (req: Request,res: Response,next: NextFunction)=>{


    var rdr:string = req.body.rdr;
    var success:string = "";

    if(rdr != undefined && rdr != ""){
        success=JSON.parse(Buffer.from(rdr, 'base64').toString()).path;
    }else{
        success='/dashboard';
    }

    passport.authenticate('college-login',{
      successRedirect: success,
      failureRedirect: `/?redirect=${rdr}`,
      failureFlash: true
    })(req,res,next);

}


export default { view, post }