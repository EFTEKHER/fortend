import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

// List of admin emails
const adminEmails = ['binary2ai@gmail.com', 'shaimacme@gmail.com'];
// Allowed routes for non-admin (patient) users
const allowedPatientRoutes = ["/report", "/patient","/chatbot"];

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Redirect to login if no user is logged in.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // For non-admin users, only allow access to /report and /patient routes.
  if (!adminEmails.includes(user.email) && !allowedPatientRoutes.includes(location.pathname)) {
    return <Navigate to="/patient" />;
  }

  return children;
};

export default ProtectedRoute;
