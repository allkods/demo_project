import {Connect, Execute } from "./mysql";

const exec = ()=>{

      // Creating tables if not exists
        //databse
        Connect()
        .then(connection => {

             //tables
             var sql:string = `CREATE TABLE IF NOT EXISTS users (
                id SMALLINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
                email VARCHAR(40),
                password VARCHAR(100)
            );`;

            Execute(connection,sql)
            .then(result =>{

            })
            .catch(error =>{
                console.log(error.message)
            })

        })
        .catch(error => {
            console.log(error.message)
        })

}

export default exec