import _axios from 'axios';
const axios_user = (baseURL) =>{
    const instance = _axios.create({
        baseURL : baseURL || 'http://114.32.250.105:4000',
    });
    return  instance;
}
const axios_ins = (baseURL) =>{
    const instance = _axios.create({
        baseURL : baseURL || 'http://114.32.250.105:5000',
    });
    return  instance;
}
export {axios_user,axios_ins}
//export default axios();
