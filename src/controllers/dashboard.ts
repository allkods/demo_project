import { Request, Response, NextFunction } from "express";

const view = ( req:any, res: Response, next: NextFunction )=>{

        if(req.user.type == '0' ){
            return res.redirect('/information');
        }
        else{
            return res.redirect('/college');
        }

   
}


export default { view }