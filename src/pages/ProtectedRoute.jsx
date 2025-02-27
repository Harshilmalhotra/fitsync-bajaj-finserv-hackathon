// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;