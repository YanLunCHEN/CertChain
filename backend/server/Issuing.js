import  express, { json } from 'express';
import  bodyParser  from 'body-parser';
import  { SelectIsuingpermission }  from './DataBase/sql.js';
import  cors  from 'cors';
import fileUpload from 'express-fileupload';
import pkg from 'morgan';
import { verifytoken} from './backend/issuing_verify/decode.js';
import { token } from './backend/issuing_verify/encode.js';
import { insert }  from './BlockchainFile/process_data.js'

import fs from 'fs'; 



const app =new  express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath:true
}));

app.use(pkg('dev'));
app.use(bodyParser.urlencoded({extended:true}));

app.post('/SignInIns',cors(),(async (req, res) => {
    let pw =req.body.passwd;
    const Email = req.body.email;
    let ISEMAIL =await SelectIsuingpermission(Email,pw);
    if(ISEMAIL == false){
        console.log(ISEMAIL)
        return res.send('Account err');
    } else{
        let db_data = ISEMAIL.recordset[0];
        console.log(db_data);
        let access_token= token(db_data);
        console.log("ACCESS :::::: " ,access_token);
        //console.log(access_token);
        return res.json({status : 'success' , access_token : access_token} )
    } 
}));




/**
* catch xlsx to path file ; 
*/
app.post('/InsertToBlockchain',async (req, res)=>{  
    console.log(req);
    console.log("::::::::::::::::::::",req.headers.access_token);//前端要修
    let  callback = await verifytoken(req.headers.access_token);
    console.log(callback);
    //console.log(req.files);
    //console.log("access" , callback);
    let email = callback.Email;
    console.log(email); 
    if(callback){
        try{
            if(!req.files){
             return res.json({msg : 'FileNotExist'});
            }
            else{
                let avatar =req.files.file;
                let  statice = await MoveFile(avatar);
                if(statice== true ){
                    let status = await insert(avatar.name , email );
                    if(status){
                        res.json({msg : 'reject sucess'});
                    }
                }
            }
        }catch(err){
            console.log("catch err InsertToBlockchain: "+err);
            
        }
    }else{
        //return res.json({msg: 'accesstoken Error'});
        res.status(400);
    }
});

app.post('/registe',(req, res)=>{
    let filename= null ; 
    if(req){
        filename = req.body.RepresentInstitution;
        const stream = fs.createWriteStream(`${filename}.txt`, "utf8");
        stream.once('open', () => {
            console.log(typeof req.body )
            let g =JSON.stringify(req.body);
            stream.write(g);
        });
        return res.json({msg : 'sccess'});
       
    }
    return res.json({msg : 'not sccuess'});
});

app.get('/sign_out',(req,res)=>{
    //access_token=null;
    return res.send(true);
});

function MoveFile(avatar){
    return (new Promise((resolve, reject)=>{
        avatar.mv('./BlockchainFile/'+avatar.name);
        resolve(true);
    }))
};

app.listen(5000,'0.0.0.0',()=>{
    console.log("run localhost:5000");
})