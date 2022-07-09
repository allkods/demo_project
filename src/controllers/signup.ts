import { Request, Response, NextFunction } from "express";
import { Connect, Post, Get } from "../config/mysql";


const view = (req: Request,res: Response,next: NextFunction)=>{

    res.locals.error = req.query;
    return res.render('signup');

}

const post = (req: Request,res: Response,next: NextFunction)=>{

    const { email, password } = req.body;

    if(!email || !password){
        return res.redirect('/signup?error=2')
    }

    Connect()
    .then(connection =>{

        // Checking if user already exists
        const sql: string = "SELECT * FROM users WHERE email = ?;";
        Get(connection,sql,[email])
        .then(result => {

            if(result.length>0){
                res.redirect('/signup?error=1')
            }else{

                // Inserting data to database
                const query = 'INSERT INTO users(email,password) VALUES(?,?);';
                Post(connection,query,[email,password])
                .then(result =>{
                    return res.json({
                        status : "success",
                        email : email,
                        password : password,
                        id : result.insertId
                    })

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

            }

        })
        .catch(error =>{
            return res.status(500).json({
                message:error.message,
                error
            })
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