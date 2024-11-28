import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('loggedInUser');

  if (isAuthenticated) {
    return <Element />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;