import NodeRSA  from 'node-rsa';
import * as fs  from 'fs';
let data=fs.readFileSync('C:/Users/nulc9/Desktop/server/BlockchainFile/pem/private.pem','utf-8');
const key = new NodeRSA(data,'pkcs1-private-pem');
function decode(data){      
        let plaintext= key.decrypt(Buffer.from(data,'hex'),'utf-8');
        console.log(plaintext);
        let encrypt  = plaintext.slice(0,256);
        let encrypt2 = plaintext.slice(256);
        let plaintext_json = JSON.parse(Buffer.from(plaintext.slice(256), "hex"));
        let response = [];
        response.push(encrypt,encrypt2,plaintext_json);
        return response;     
}
export {decode}
