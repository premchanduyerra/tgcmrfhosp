// ProtectedRoute.js
import React from 'react';
import { Navigate} from 'react-router-dom';
import { isLoggedIn } from '../hooks/auth';
 
const ProtectedRoute = ({ element: Element }) => {
  console.log("executing protected route")

  if (!isLoggedIn()) {
         return <Navigate to='/home'/>
     // Return null to prevent rendering the component
  }
  return <Element/>
};

export default ProtectedRoute;
