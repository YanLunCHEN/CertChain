import jwt from 'jsonwebtoken';
import * as fs  from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let data= fs.readFileSync(path.join(__dirname, '../../BlockchainFile/pem/private.pem'),'utf-8');
function token(db_data){
    return (jwt.sign(db_data ,data , { 
        expiresIn : 60*60*24 
    }))
}
export { token }
