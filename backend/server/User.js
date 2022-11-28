import  express from 'express';
import  bodyParser  from 'body-parser';
import  { selectAccount   ,select_all_owner, select_tx_select , select_tx_select_Email ,selectAccountToShares,insertAgreeselect,shared_cert}  from './DataBase/sql.js';
import {produceDate} from './DataBase/share_date.js'
import catchDate from './BlockchainFile/catch_date.js';
import  cors  from 'cors';
import fileUpload from 'express-fileupload';
import { ProcessingList } from './BlockchainFile/ProcessingList.js';
import { verifyToken } from './backend/verifyToken.js';
import  {get_BlockChainHash}  from './BlockchainFile/get_blockchain_data.js'
import {decode} from './BlockchainFile/decode.js'
const app =new  express();
app.use(cors());
app.use(bodyParser.json());

app.use(fileUpload({
    createParentPath:true
}));
//app.us e(pkg('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.post('/SignInUser',cors(),async (req,res)=>{//success 
    //console.log(1);
    console.log("req.body.access_token: " + req.body.access_token);   
    let verify_status=await verifyToken( req.body.access_token);
    let status=verify_status["email_verified"]
    if(status == 'true' ){
        let sql_status =selectAccount(req.body.name ,req.body.email);
        if(sql_status == true){
            return res.json({msg : 'sql_status'});
        }else{
            return res.json({msg : 'sql_Account error'});
        }
    }
    else{
        return res.json({msg: 'Sign_error'});
    }
});


app.post('/get_others_certificate',cors(),async(req,res)=>{
    let list=[];
    let status =await verifyToken( req.body.access_token);
    let email = status['email'];
    if(status['email_verified'] == 'true'){
        let data = await select_tx_select(email);
        console.log("get_Other:",data)
        if(data !== false){
            let db_data = await select_tx_select_Email(email);
            console.log("dbbbb:",db_data)
            let listsize=db_data.rowsAffected[0];
            for(let i=0;i<listsize;i++){
                list.push(db_data.recordset[i].OwnerEmail);
            }
            let other_certificate_list = await ProcessingList(listsize , list);
            console.log(other_certificate_list);
            return res.send(other_certificate_list);
        }else{
            return res.json({ status : 'not certificate' });
        }
    }
    else{
        return res.json({msg : 'Access Token Error'});   
    }
});

app.post('/get_my_certificate',async (req,res)=>{ //success
    let status =await verifyToken( req.body.access_token);
    let email = status['email'];
    if(status['email_verified'] == 'true'){
    let sql_Tx_Id=  await select_all_owner(email)
        if(sql_Tx_Id){
            let Tx_id = await get_BlockChainHash(email);
            if(Tx_id ){
                let certificate = decode(Tx_id);
                var certificate_json=certificate[2];
                let jsonString=JSON.stringify(certificate_json);
                jsonString=jsonString.slice(0,-1);
                jsonString+=  `  , "signature" : "${certificate[0]}" , "jsonHex" : "${certificate[1]}"}`;
                jsonString=JSON.parse(jsonString);
                console.log(jsonString);
               // console.log(certificate_json);
                return res.send(jsonString);
            }else{
                return res.json({ status : 'sql not certificate' });
            }

        }else{
            return res.json({status : "not certificate"});
        }
    }else{
        return res.json({err : 'verifyErr' });
    }
});

app.post('/share_my_cert',cors(),async (req,res)=>{
    const createEmail = req.body.createEmail;
    const insertDate = req.body.date ;
    let stat =await verifyToken( req.body.access_token);
    let email = stat['email']; 
    let status = await selectAccountToShares(createEmail);
    
    if(status == true ){
        let produce = await produceDate(insertDate);
        let date        = catchDate();  
        let sql_status =await insertAgreeselect(email,createEmail,date,produce);
        if(sql_status == true){
            return res.json({status : "insertAgressselect success"});
        }else{
            return res.json({status : 'insertAgressselect reject ' });
        }
    }
    else{
        return  res.json({status : 'createEmail not in db' });
    }
})
app.post('/shared_cert',cors(),async(req,res)=>{
    let status = await verifyToken( req.body.access_token);
    let email = status['email'];
    let list=[];
    if(status['email_verified'] == 'true'){
        let db_data=await shared_cert(email);
        console.log(db_data);
        let listsize=db_data.rowsAffected[0];
        if(db_data === false){
            return res.send('not data');
        }
        else{
            for(let i=0;i<listsize;i++){
                list.push(db_data.recordset[i].SelectEmail);
            }
            return res.send(list);
        }
    }else{
        return res.json({status : 'not share' });
    }
})
 
/*app.get('/getAccessToken',cors(), (req,res)=>{
    console.log(access_token);
    return res.json({access_token : access_token ,  : name} );
    //return res.send(access_token);
})*/
app.get('/sign_out',cors(), (req,res)=>{
    return res.json({ status : 'success' });
})
app.get('/GetServerStatus',cors({ credentials: true }), (req,res)=>{
    res.json({ status : 'success' });
})
//  app.listen(4000,()=>{
//     console.log("run localhost:4000");
// })
app.listen(4000, '0.0.0.0',()=>{
        console.log("run localhost:4000");
    })


