// Import necessary dependencies
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { toast } from "react-toastify";

// Contact component
export default function Contact({ userRef, listing }) {
  // Define state variables
  const [landlord, setLandlord] = useState(null); // State for storing landlord data
  const [message, setMessage] = useState(""); // State for storing message content
  const [messageSent, setMessageSent] = useState(false); // State for tracking message sent status

  // Fetch landlord data from Firestore
  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data()); // Set landlord data in state
        console.log("user: ", userRef);
      } else {
        toast.error("Could not get Landlord Info");
      }
    }
    getLandlord();
  }, [userRef]);

  // Handle input change for message content
  function onChange(e) {
    setMessage(e.target.value);
  }

  // Send message to landlord
  function sendMessage() {
    const mailtoLink = `mailto:${landlord.email}?Subject=${listing.name}&body=${message}`;
    window.location.href = mailtoLink; // Redirect to mail app with pre-filled email
    setMessageSent(true); // Update message sent status
  }

  // Reset the form to initial state
  function resetForm() {
    setMessage(""); // Clear message content
    setMessageSent(false); // Reset message sent status
  }

  // Render the Contact component
  return (
    <>
      {landlord !== null && (
        <div className='flex flex-col w-full'>
          {messageSent ? (
            <div className='mb-6'>
              <p>Message sent to {landlord.name}</p>
            </div>
          ) : (
            <p>{`Contact ${landlord.name} for the ${listing.name.toLowerCase()}`}</p>
          )}
          {!messageSent && (
            <>
              <div className='mt-3 mb-6'>
                <textarea
                  name="message"
                  id="message"
                  rows="2"
                  value={message}
                  onChange={onChange}
                  className='w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded 
                    transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600'
                ></textarea>
              </div>
              <button
                type='button'
                className='px-7 py-3 bg-blue-600 text-white rounded
                  text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg 
                  focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg
                  transition duration-150 ease-in-out w-full text-center mb-6'
                onClick={sendMessage}
              >
                Send Message
              </button>
            </>
          )}
          {messageSent && (
            <div className='mb-6'>
              <button
                type='button'
                className='px-7 py-3 bg-blue-600 text-white rounded
                  text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg 
                  focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg
                  transition duration-150 ease-in-out w-full text-center'
                onClick={resetForm}
              >
                Contact Landlord
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
