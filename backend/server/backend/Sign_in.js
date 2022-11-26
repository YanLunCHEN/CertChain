import  {verifyToken} from './verifyToken.js';
async function sign_in(req){
    let access_token = req.body.access_token;
    let verify_status =await  verifyToken(access_token);
    let status=verify_status["email_verified"]
    return (status)
}
export {sign_in}