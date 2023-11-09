import axios from "axios"
import { doLogout, getToken, getUserId } from "../auth"
import { createBrowserHistory } from "history";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


 
export const BASE_URL='http://localhost:8080/v1'


export const myAxios=axios.create({
    baseURL:BASE_URL
})

export const privateAxios=axios.create({
    baseURL:BASE_URL
})
const history = createBrowserHistory();

privateAxios.interceptors.request.use(config=>{
    const token=getToken()
    const userId = getUserId();
    console.log("userId: " + userId)
    console.log(token);
    if(token){
        config.headers.authToken=`${token}`;
        config.headers.userId = `${userId}`;
        return config
    }
},error=>Promise.reject(error))


