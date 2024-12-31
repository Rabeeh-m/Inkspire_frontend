
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Access the `allUserData` from the auth state
  const allUserData = useSelector((state) => state.auth.allUserData);

  // Check if the user data exists
  return allUserData ? children : <Navigate to="/login/" />;
};

export default PrivateRoute;

