import axios from "axios"
import { getToken } from "../auth"
 
//export const BASE_URL='https://dev8.cgg.gov.in/tsecgrievanceapi/'
export const BASE_URL='http://localhost:8080/v1'

export const myAxios=axios.create({
    baseURL:BASE_URL
})

export const privateAxios=axios.create({
    baseURL:BASE_URL
})

privateAxios.interceptors.request.use(config=>{
    const token=getToken()
    console.log(token);
    if(token){
        config.headers.authToken=`${token}`
        return config
    }
},error=>Promise.reject(error))

export const BASE_UI={
    baseUI:"http://localhost:3000"
}