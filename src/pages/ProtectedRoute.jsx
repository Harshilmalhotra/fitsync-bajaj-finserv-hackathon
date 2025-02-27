import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Show loading spinner if auth status is still being determined
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if no user is logged in
  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
