import jwt from 'jsonwebtoken';
import * as fs  from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let data= fs.readFileSync(path.join(__dirname, '../../BlockchainFile/pem/private.pem'),'utf-8');
function verifytoken(token) {
    return (new Promise((resolve, reject) => {
        jwt.verify(token , data ,(err, decoded)=>{
            console.log(decoded);
            if(err) reject(err);
            resolve(decoded);
        })  
    }))
      
}

export { verifytoken } ; 