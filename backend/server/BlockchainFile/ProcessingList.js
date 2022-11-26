import {decode} from './decode.js';
import {get_BlockChainHash} from './get_blockchain_data.js';
function ProcessingList(size, emailList){
    let process = [];
    return(new Promise(async function(resolve,reject){
        for(let i =0 ; i<size ; i++){
            let Tx_id = await get_BlockChainHash(emailList[i]);
            let certificate =decode(Tx_id);
            var certificate_json=certificate[2];
            let jsonString=JSON.stringify(certificate_json);
            jsonString=jsonString.slice(0,-1);
            jsonString+=  `  , "signature" : "${certificate[0]}" , "jsonHex" : "${certificate[1]}"}`;  
            jsonString=JSON.parse(jsonString);
            process.push(jsonString);
        }
        if(process){
            resolve(process);
        }
        else{ 
            reject("Process Error");
        }
    }))
}
export { ProcessingList }