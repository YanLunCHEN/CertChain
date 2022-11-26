import request from 'request';
function verifyToken(access_token){
    return new Promise(function(resolve, reject){
        request(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${access_token}`,(error, response,body) => {
            if (error) {
                console.log(error)
            }
            body = JSON.parse(body);
            if(body.error) {
                reject(body.error);
            } 
            else {
                resolve(body);
            }
        })
    })
    
   
}
export { verifyToken }