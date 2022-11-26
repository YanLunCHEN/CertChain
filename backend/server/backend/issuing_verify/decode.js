import jwt from 'jsonwebtoken';
import * as fs  from 'fs';
let data= fs.readFileSync('C:/Users/nulc9/Desktop/server/BlockchainFile/pem/private.pem','utf-8');
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