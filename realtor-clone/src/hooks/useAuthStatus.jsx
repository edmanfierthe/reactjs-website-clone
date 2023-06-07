// Import necessary dependencies
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

// Custom hook for checking authentication status
export function useAuthStatus() {
  // Set up state variables
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    // Get the auth instance
    const auth = getAuth();

    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated
        setLoggedIn(true);
      }
      // Finished checking authentication status
      setCheckingStatus(false);
    });
  }, []);

  // Return the authentication status and checking status
  return { loggedIn, checkingStatus };
}
