import axios from 'axios';
import {getToken, getUserId} from '../auth';
export const BASE_URL=process.env.REACT_APP_API_URL;
console.log(BASE_URL);

export const myAxios=axios.create({
  baseURL: BASE_URL,
});

export const privateAxios=axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use((config)=>{
  const token=getToken();
  const userId = getUserId();
  console.log('userId: ' + userId);
  console.log(token);
  if (token) {
    config.headers.authToken=`${token}`;
    config.headers.userId = `${userId}`;
    return config;
  }
}, (error)=>Promise.reject(error));


