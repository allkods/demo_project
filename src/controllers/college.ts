import { Request, Response, NextFunction } from "express";
import reader from "xlsx";
import Exams from "../database/models/Exams";

const view = (req: any,res: Response,next: NextFunction)=>{
    
    (async()=>{
        const exam:any = await Exams.findAll({ where: { id: req.user.id } });

        return res.render('college',{
            csrfToken:req.csrfToken(),
            exams:exam
        });

    })();
}

const post = (req: any,res: Response,next: NextFunction)=>{

  
   

}


export default { view, post }