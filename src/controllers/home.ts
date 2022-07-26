import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import Vehicle_Categories from "../database/models/Categories";
import Vehicle_Companies from "../database/models/Companies";
import Vehicle_Models from "../database/models/Models";

const view = (req: any,res: Response,next: NextFunction)=>{

    return res.render("home");
    
}

const post = (req: any,res: Response,next: NextFunction)=>{

    (async ()=>{

        const { draw, start, length, order, columns, search } = req.body;

        // preparing query for ordering

        // if(!order){

        //     var column_name = 'categories';
        //     var column_sort_order = 'DESC';

        //     var ordered:any = [column_name,column_sort_order]

        // }else{

        //      var column_index = order[0]['column'];
        //      var column_name:string = columns[column_index].data;
        //      var column_sort_order:string = order[0]['dir'].toUpperCase();

        //      if(column_name == 'categories'){
        //         var ordered:any = [column_name,column_sort_order]
        //      }else{
        //         var ordered:any = column_name == 'companies' ?
        //      [{model:Vehicle_Companies,as:'companies'},"companies",column_sort_order] :
        //      [{model:Vehicle_Companies,as:'companies',order:[[{model:Vehicle_Models,as:'models'},"models",column_sort_order]]},"companies",column_sort_order]

        //      }    

        // }


        // fetching data from vehicle_categories table
        const data:any = await Vehicle_Categories.findAll({
            where:{[Op.or] : [
                { categories : { [Op.like] : `%${search.value}%` } },
                 { "$companies.companies$" : { [Op.like] : `%${search.value}%` } },
                 { "$companies.models.models$" : { [Op.like] : `%${search.value}%` } }
            ] },

            include:[
            {
                model: Vehicle_Companies,
                as:'companies',
                required:true,
                include:[{
                    model:Vehicle_Models,
                    as:'models',
                    required:true
                }]
            }
        ]
        
    });

        
        // preparing single json array from data
        const finalData:any[] = [];

        for(var i=0; i< data.length; i++){
            
            for(var j=0; j< data[i].companies.length; j++){

                for(var k=0; k< data[i].companies[j].models.length; k++){

                    finalData.push({

                        categories: data[i].categories,
                        companies:data[i].companies[j].companies,
                        models:data[i].companies[j].models[k].models
                    });
                }
                
            }
        }


        // limiting array
        const rangedData = finalData.slice(start,start+length);


    // declaring response object
    const totalRecords = finalData.length;
    const totalrecWithFilter = finalData.length;

    const output = {
        draw : draw,
        iTotalRecords : totalRecords,
        iTotalDisplayRecords : totalrecWithFilter,
        aaData : rangedData
    }        

        return res.json(output);

    })();
   

}


export default { view, post }