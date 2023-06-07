// Import necessary dependencies
import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

// PrivateRoute component
export default function PrivateRoute() {
  // Get the logged-in status and checking status from the useAuthStatus hook
  const { loggedIn, checkingStatus } = useAuthStatus();

  // If still checking the authentication status, show a spinner
  if (checkingStatus) {
    return <Spinner />;
  }

  // If logged in, render the nested routes
  // If not logged in, navigate to the sign-in page
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
}
