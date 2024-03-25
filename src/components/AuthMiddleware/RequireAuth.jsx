// RequireAuth.js

import React from "react";
import { Redirect } from "react-router-dom";

const RequireAuth = (WrappedComponent) => {
  const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., check if the token exists in cookies)
    // You may implement your own logic here
    const token = document.cookie.includes("jwt");
    return token;
  };

  return (props) => {
    if (isAuthenticated()) {
      return <WrappedComponent {...props} />;
    } else {
      // Redirect to the login page if not authenticated
      return <Redirect to="/admin/login" />;
    }
  };
};

export default RequireAuth;
