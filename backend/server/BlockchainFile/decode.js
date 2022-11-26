import NodeRSA  from 'node-rsa';
import * as fs  from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let data=fs.readFileSync(path.join(__dirname, './pem/private.pem'),'utf-8');
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
