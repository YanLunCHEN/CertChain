import readFile from './Blockchain.js';
import {reject_bc} from './insert_to_bc.js'; 
import {CreateBlockchainHash} from '../DataBase/sql.js'
import catchDate from './catch_date.js';

let array = [];
let email = [];
let dies = []; 
let length ;
async function insert(filename,email){
    return(new Promise(async (resolve, reject) =>{
        console.log("filename :::: " , filename);
        let transaction_InFo =await  readFile(filename ,email);
        console.log(transaction_InFo);
        let status = await Processing(transaction_InFo);
        if(status){
           let stat=to_blockchain();
           resolve(stat) ; 
        }
    }))
}

function Processing(transaction_InFo){
    return(new Promise((resolve, reject)=>{
        length=transaction_InFo.length-1;
        console.log(length);
        for(let i=1 ; i<transaction_InFo.length -1 ; i++){ 
            
            let new_transaction_info = transaction_InFo[i].split(",");
            for(let j =0 ; j<3 ;j++ ){ // 0 tx Hash 1 Email 2 證書葛屁時間
                switch(j){
                    case 0   :  let data=new_transaction_info[j];
                                array.push(data);
                                break;
                    case 1   :  let Email=new_transaction_info[j];
                                console.log(Email);
                                email.push(Email);
                                break;
                    case 2  :   let die = new_transaction_info[j];
                                dies.push(die);
                                break;
                }
            }
        }
        resolve(true);

    }))
}
async function to_blockchain(){
    await reject_bc(array,email);
    for(let i=0 ;i < email.length;i++){
        let time =catchDate();
        CreateBlockchainHash(email[i],time);
    }
    return true ;
    
}
export  { insert }