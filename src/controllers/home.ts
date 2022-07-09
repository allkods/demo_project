import { Request, Response, NextFunction } from "express";


const view = (req: Request,res: Response,next: NextFunction)=>{

    return res.render('home')

}


export default { view }