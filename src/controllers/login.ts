import { Request, Response, NextFunction } from "express";
import { Connect, Get } from "../config/mysql";


const view = (req: Request,res: Response,next: NextFunction)=>{

    res.locals.error = req.query
    return res.render('login');

}

const post = (req: Request,res: Response,next: NextFunction)=>{

    const { email, password } = req.body;

    Connect()
    .then(connection =>{

        const query = 'SELECT * FROM users WHERE email=?;';
        Get(connection,query,[email])
        .then(result =>{

      
            if(result.length >0){

                if(result[0].password == password){
                    return res.json({Login : "success"})
                }               
                else{
                    return res.redirect('/login?error=password')
                }
            }
            else{
                return res.redirect('/login?error=email')
            }

        })
        .catch(error =>{
            return res.status(500).json({
                message:error.message,
                error
            })
        })
        .finally(()=>{
            connection.end();
        })
    })
    .catch(error =>{
        return res.status(500).json({
            message:error.message,
            error
        })
    })

}


export default { view, post }