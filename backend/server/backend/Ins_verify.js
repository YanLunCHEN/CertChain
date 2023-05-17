// const {OAuth2Client} = require('google-auth-library');
import {OAuth2Client} from 'google-auth-library';
const clientID = '100559822787-ujji5gc5nk4aqmn1hlevjnmbjmtsro6q.apps.googleusercontent.com'
const client = new OAuth2Client(clientID);
async function verify(token) {
  try {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    return payload
  } catch (error) {
    return error
  }
  
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
export {verify}