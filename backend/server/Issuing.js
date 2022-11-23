import  express from 'express';
import  bodyParser  from 'body-parser';
import  { SelectIsuingpermission }  from './DataBase/sql.js';
import  cors  from 'cors';
import fileUpload from 'express-fileupload';
import pkg from 'morgan';
import { verifytoken} from './backend/issuing_verify/decode.js';
import { token } from './backend/issuing_verify/encode.js';
import { insert }  from './BlockchainFile/process_data.js'
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
        let db_data =ISEMAIL.recordset[0];
        let access_token= token(db_data);
        console.log(access_token);
        //console.log(access_token);
        return res.json({status : 'success' , access_token : access_token} )
    } 
}));




/**
* catch xlsx to path file ; 
*/
app.post('/InsertToBlockchain',async (req, res)=>{  
    console.log("::::::::::::::::::::",req.headers.access_token);//前端要修
    let  callback = await verifytoken(req.headers.access_token);
    //console.log(req.files);
    //console.log("access" , callback);
    let email = callback.Email;
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
            console.log(err);
        }
    }else{
        //return res.json({msg: 'accesstoken Error'});
    }
});

app.post('/registe',(req, res)=>{
    if(req){
        console.log(req.body);
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

app.listen(5000,()=>{
    console.log("run localhost:5000");
})