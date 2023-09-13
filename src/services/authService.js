import { myAxios } from "../hooks/axios/axiosHelper";


 
export const loginUser= (loginDetails)=>{

    return myAxios.post('/login',loginDetails).then(response=>{
        console.log(response.data);
        return response.data
    })

}
 


