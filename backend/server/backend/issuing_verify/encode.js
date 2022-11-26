import jwt from 'jsonwebtoken';
import * as fs  from 'fs';
let data= fs.readFileSync('C:/Users/nulc9/Desktop/server/BlockchainFile/pem/private.pem','utf-8');
function token(db_data){
    return (jwt.sign(db_data ,data , { 
        expiresIn : 60*60*24 
    }))
}
export { token }
