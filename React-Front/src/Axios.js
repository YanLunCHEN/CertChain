import _axios from 'axios';
const axios_user = (baseURL) =>{
    const instance = _axios.create({
    baseURL : baseURL || 'https://certchain.chang-cat.com/api/user',
    // baseURL : baseURL || 'http://114.32.179.20:4000/',
    //baseURL : baseURL || 'http://114.32.250.105:4000',

    })
    return  instance;
}
const axios_ins = (baseURL) =>{
    const instance = _axios.create({
        baseURL : baseURL || 'https://certchain.chang-cat.com/api/ins',
       // baseURL : baseURL || 'http://114.32.250.105:5000',
        // baseURL : baseURL || 'http://114.32.179.20:5000/'
    });
    return  instance;
}
export {axios_user,axios_ins}
//export default axios();
