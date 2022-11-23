import fs from 'fs';
import {select_key} from '../DataBase/sql.js'
import axios from'axios';
let file_data;
let signature ;
let data1;
async function readFile(name,email){
    let data22= await select_key(email);
    console.log(data22);
    let publickey=data22.recordset[0].pubkey;
    let st = await readcsv(name);
    if(st === true){
        let stt=await verify_data_Info(publickey);
        if(stt){
            return (data1);
        }
    }
}
function readcsv(dirname){
    dirname = 'C:/Users/nulc9/Desktop/server/BlockchainFile/'+dirname;
    console.log(dirname);
    return (new Promise((resolve,reject)=>{
        fs.readFile(dirname, 'utf8', function (err, data) {
            file_data=data.slice(256);
            data1=data.split("\r\n");
            signature = data1[0];
            resolve(true);
        })
    }))  
}
function verify_data_Info(publickey){
    return (new Promise((resolve, reject)=>{
        axios.post('http://218.161.4.208:11000/verify_inst',{
            signature:  signature  , 
            file_data : file_data ,
            publickey : publickey
        }).then((res)=>{
            resolve(res.data);
            console.log(res.data);
        })
    }))
}
export default readFile;