
import {toast} from 'react-toastify';
import {doLogout} from '.';

export const handleLogoutAndRedirect = (navigate, error) => {
  if (error.response.data.status === 400||error.response.data.status === 401 || error.response.data.status === 403) {
    doLogout();
    // Redirect to the home page
    navigate('/');
    toast.success('please login again..!!');
  }
};
