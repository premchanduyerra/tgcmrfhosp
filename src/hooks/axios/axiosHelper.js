import axios from "axios"
import { doLogout, getToken } from "../auth"
import { createBrowserHistory } from "history";


 
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
    console.log(token);
    if(token){
        config.headers.authToken=`${token}`
        return config
    }
},error=>Promise.reject(error))

// privateAxios.interceptors.response.use(
    
//     console.log('interceptor'),
//     (response) => {
//         // If the response indicates a redirect to login, navigate to the login page
//         if (response.response.data.message === 'Token Expired') {
//             console.log("Token Expired Navigating to login")
//             doLogout();
//             history.push("/");
//         }
//         return response;
//     },
//     (error) => {
//         // Handle errors
//         if (error.response && error.response.status === 401) {
//             // Unauthorized, redirect to login
//             history.push('/');
//         }
//         return Promise.reject(error);
//     }
// );
