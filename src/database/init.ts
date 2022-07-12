import sequelize from "./connection";
import College_Users from "./models/College_Users"
import Colleges from "./models/Colleges"
import College_Addresses from "./models/College_Addresses";
import Exams from "./models/Exams";

const dbInit = ()=>{

    // Syncing sequelize
    sequelize.sync({force:true})
    .then(result =>{


        // Inserting hard coded data to database

        (async ()=>{
            const cu:any = await College_Users.create({
                email:'sahilrajkashyap4@gmail.com',
                password : '$2a$10$oUZGqfqf6YvZVTQ5knd/JO2DUisws.9q.FWlgaSNo5GAzKISB9Oi.', // use 1234 as password while login
                type : '1'
            });
    
            const college:any = await Colleges.create({
                uniqid:"2154785212",
                name:"Sinhgad Institute of Management And Computer Application",
                image:"/images/colleges/225412.jpeg",
                uid:cu.id
            });

            const add:any = await College_Addresses.create({
                state:"maharashtra",
                city:"pune",
                pin:"411041",
                landmark:"Opposite Bank of Maharashtra, Narhe",
                cid:college.id
            });

            const exam:any = await Exams.create({
                uniqid:"225478",
                name:"logica",
                image:"/images/exams/025461.jpg",
                starting : new Date("2022-07-15 12:01:01"),
                duration : "120",
                cid:college.id
            });


        })();

    })
    .catch(err =>{
        console.log(err)
    })
}

export default dbInit;