import mysql from 'mysql';
import config from './config';

const params = {
    host : config.mysql.host,
    user : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
}

const Connect = async () => new Promise<mysql.Connection>((resolve,reject)=>{
    const connection = mysql.createConnection(params);

    connection.connect((err)=>{
        if(err){
            reject(err);
            return;
        }
                
        resolve(connection);
    });
});

const Get = async (connection: mysql.Connection, query: string,data: any[]=[])=> new Promise<Array<any>>((resolve,reject)=>{
 
        connection.query(query,data,(error,result)=>{
            if(error){
                reject(error);
                return;
            }

            resolve(result);
        })

})

const Post = async (connection: mysql.Connection, query: string,data: Array<any>)=> new Promise<any>((resolve,reject)=>{
    connection.query(query, data, (error,result)=>{

        if(error){
            reject(error);
            return;
        }

        resolve(result);

    })
})

const Execute = async (connection: mysql.Connection, query: string)=> new Promise((resolve,reject)=>{
 
    connection.query(query,connection,(error,result)=>{
        if(error){
            reject(error);
            return;
        }

        resolve(result);
    })

})

export { Connect, Get, Post, Execute };