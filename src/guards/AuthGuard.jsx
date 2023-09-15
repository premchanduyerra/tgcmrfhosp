// ProtectedRoute.js
import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../hooks/auth';
 
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const navigate = useNavigate();

  if (!isLoggedIn()) {
         navigate('/');
    return null; // Return null to prevent rendering the component
  }

  return <Route {...rest} element={<Component />} />;
};

export default ProtectedRoute;
