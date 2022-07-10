import Users from "../models/Users";

export const authenticate = async (payload:any) => new Promise((resolve,reject)=>{

    
    (async ()=>{

        const data = await Users.findOne({ where: { email: payload.email } });
        if(data){

            if(data.password == payload.password){
                resolve(data);
            }
            else{
                reject('InvalidPassword');
            }

        }else{
            reject("NotFound");
        }

    })(); 

});


export const signup = async (payload:any) => new Promise((resolve,reject)=>{

    (async () =>{
        const data = await Users.create({ email: payload.email, password: payload.password });

        resolve(data);

    })();

});