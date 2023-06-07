// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth"

// Header component
export default function Header() {
  // Define state variables
  const [pageState, setPageState] = useState("Sign in"); // State for storing page state (Sign in or Profile)
  const location = useLocation(); // Hook for accessing current location
  const navigate = useNavigate(); // Hook for navigating to different routes
  const auth = getAuth(); // Get the authentication instance

  // Check authentication state and update page state accordingly
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile"); // User is authenticated, set page state to Profile
      } else {
        setPageState("Sign in"); // User is not authenticated, set page state to Sign in
      }
    });
  }, [auth]);

  // Check if the current route matches the provided route
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  // Render the Header component
  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
      <header className='flex justify-between items-center px-4 max-w-6xl mx-auto'>
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className='h-5 cursor-pointer'
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className='flex space-x-10'>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent
              ${pathMatchRoute("/") && "text-gray-950 border-b-red-600"}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent
              ${pathMatchRoute("/offers") && "text-gray-950 border-b-red-600"}`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>

            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent
              ${(pathMatchRoute("/sign-in") || pathMatchRoute("profile")) && " text-gray-950 border-b-red-600"}`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
