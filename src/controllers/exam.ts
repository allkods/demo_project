import { Request, Response, NextFunction } from "express";
import reader from "xlsx";
import Exams from "../database/models/Exams";
import Questions from "../database/models/Questions";
import fs from "fs";

const view = (req: any,res: Response,next: NextFunction)=>{

    const examId = req.params.uniqid;

    (async()=>{
        const exam:any = await Exams.findOne({ where: { uniqid: examId} });

        if(exam !== null){

            return res.render('exam',{
                csrfToken:req.csrfToken(),
                exam:exam
            });

        }

    })();
    
    
}

const post = (req: any,res: Response,next: NextFunction)=>{

    const examId = req.params.uniqid;

    (async ()=>{

        const exam:any = await Exams.findOne({ where: { uniqid: examId } });

        if(exam == null){
            return res.redirect('/');
        }



          // getting inputs
        const { qualification, participation } = req.body;
        const files = req.files;


        //error handling
        if(!qualification || !participation || !files)
        return res.redirect(`/college/exam/${examId}`);

        if( typeof qualification != "string" && 
            typeof participation != "string" )
            return res.redirect(`/college/exam/${examId}`);

        //extracting file details
            const tempFile = files.file
            const nameArr = tempFile.name.split('.');
            const ext = nameArr[nameArr.length - 1];

            const fileName = `${Math.random().toString()}.${ext}`;
            const path=`./temp/${fileName}`

            // moving file to server
            tempFile.mv(path,(err:Error)=>{
                if(err)
                return res.status(500).send(err);


                // initiating excel file reader
                const file=reader.readFile(path);
                const sheet=file.SheetNames;

                const data:any[]=[];
                sheet.forEach(element => {

                    const tmp = reader.utils.sheet_to_json(file.Sheets[element]);
                    tmp.forEach(result => {
                        data.push(result);
                    });
                    
                });


                // Excel file error handler
                if(data.length < 1)
                return res.redirect(`/college/exam/${examId}`);

                var allowdKeys=['QUESTION','A','B','C','D','ANSWER','MARKS']

                var keys=Object.keys(data[0]);

                if(keys.length != 7)
                return res.redirect(`/college/exam/${examId}`);

                keys.forEach(element => {
                    if(allowdKeys.indexOf(element) == -1)
                    return res.redirect(`/college/exam/${examId}`);
                });


                //converting json to database friendly columns
                const newdata = data.map((element)=>{

                    const ob = {
                        question : element.QUESTION,
                        a:element.A,
                        b:element.B,
                        c:element.C,
                        d:element.D,
                        answer:element.ANSWER.toLowerCase(),
                        marks:element.MARKS,
                        examId:exam.id
                    }

                    return ob;

                });


                // Inserting questions to database

                (async ()=>{

                    const ques:any = await Questions.bulkCreate(newdata);

                    // removing temp file
                    fs.unlinkSync(path);

                    return res.redirect(`/college/exam/${examId}?status=success`);



                })();
          

        });






    })();


}


export default { view, post }