import { Request, Response, NextFunction } from "express";

const view = (req: Request,res: Response,next: NextFunction)=>{
    
    res.render('information');
}

const post = (req: Request,res: Response,next: NextFunction)=>{

   res.end("todo")

}


export default { view, post }