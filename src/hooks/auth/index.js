import {encrypt, decrypt} from '../crypto/EncrDecr';

export const isLoggedIn = () => {
  const data = sessionStorage.getItem('data');
  return data !== null;
};

export const doLogin = (data, next) => {
  if (data.statusCode === 200) {
    const encryptedUserData = encrypt(JSON.stringify(data.data));
    sessionStorage.setItem('data', encryptedUserData);
    sessionStorage.setItem(
        'dataWithoutEncpt',
        JSON.stringify(data.data),
    ); // remove this line after completion
  }
  next();
};

export const doUpdate = (data) => {
  console.log('data update in session storage');
  sessionStorage.removeItem('data');
  const encryptedUserData = encrypt(JSON.stringify(data));
  sessionStorage.setItem('data', encryptedUserData);
  sessionStorage.setItem(
      'dataWithoutEncpt',
      JSON.stringify(data),
  ); // remove this line after completion
};

export const doLogout = (next) => {
  sessionStorage.removeItem('data');
  console.log('data removed from session');
};

export const getCurrentUserDetails = () => {
  if (isLoggedIn()) {
    return JSON.parse(decrypt(sessionStorage.getItem('data')));
  }
};

export const getToken = () => {
  const user = getCurrentUserDetails();
  return user?.token;
};
export const getUserId = () => {
  const user = getCurrentUserDetails();
  return user?.userName;
};
