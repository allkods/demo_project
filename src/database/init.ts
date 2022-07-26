import sequelize from "./connection";
import Vehicle_Categories from "./models/Categories";
import Vehicle_Companies from "./models/Companies";
import Vehicle_Models from "./models/Models";

const dbInit = ()=>{

    // Syncing sequelize
    sequelize.sync({force:true})
    .then(result =>{


        // Inserting hard coded data to database

        (async ()=>{
           
            const Categories:any = await Vehicle_Categories.bulkCreate([
                {categories:'car'},
                {categories:'bike'}
            ]);

            const carCompanies:any =await Vehicle_Companies.bulkCreate([
                {
                    companies: 'honda',
                    cat_id: Categories[0].id
                },
                {
                    companies: 'hyundai',
                    cat_id: Categories[0].id
                }
            ]);

            const bikeCompanies:any =await Vehicle_Companies.bulkCreate([
                {
                    companies: 'tvs',
                    cat_id: Categories[1].id
                },
                {
                    companies: 'yamaha',
                    cat_id: Categories[1].id
                }
            ]);

         
            const models:any =await Vehicle_Models.bulkCreate([
                {
                    models: '2016',
                    com_id: carCompanies[0].id
                },
                {
                    models: '2018',
                    com_id: carCompanies[0].id
                },
                {
                    models: '2020',
                    com_id: carCompanies[0].id
                },
                {
                    models: '2016',
                    com_id: carCompanies[1].id
                },
                {
                    models: '2018',
                    com_id: carCompanies[1].id
                },
                {
                    models: '2020',
                    com_id: carCompanies[1].id
                },
                {
                    models: '2016',
                    com_id: bikeCompanies[0].id
                },
                {
                    models: '2018',
                    com_id: bikeCompanies[0].id
                },
                {
                    models: '2020',
                    com_id: bikeCompanies[0].id
                },
                {
                    models: '2016',
                    com_id: bikeCompanies[1].id
                },
                {
                    models: '2018',
                    com_id: bikeCompanies[1].id
                },
                {
                    models: '2020',
                    com_id: bikeCompanies[1].id
                }
            ]);

        })();

    })
    .catch(err =>{
        console.log(err)
    })
}

export default dbInit;