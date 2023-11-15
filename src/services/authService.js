import {APIS} from '../APIS';
import {myAxios} from '../hooks/axios/axiosHelper';

export const loginUser= async (loginDetails)=>{
  const response = await myAxios.post(APIS.LOGIN, loginDetails);
  console.log(response.data);
  return response.data;
};


