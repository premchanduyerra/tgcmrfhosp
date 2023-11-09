// ProtectedRoute.js
import React from 'react';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../hooks/auth';
 
const ProtectedRoute = ({ element: Element }) => {
  const navigate = useNavigate();
  console.log("executing protected route")

  if (!isLoggedIn()) {
         return <Navigate to='/home'/>
     // Return null to prevent rendering the component
  }
  return <Element/>
};

export default ProtectedRoute;
