import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

export default function Offers() {
  // State variables
  const [listings, setListings] = useState(null); // Stores the fetched listings
  const [loading, setLoading] = useState(true); // Indicates if listings are being fetched
  const [lastFetchedListing, setLastFetchedListing] = useState(null); // Stores the last fetched listing

  useEffect(()=>{
    // Fetch listings when component mounts
    async function fetchListings(){
      try {
        const listingsRef = collection(db, "listings");
        const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), limit(8));

        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length-1];
        setLastFetchedListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc)=>{
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch Listing");
      }
    }
    fetchListings();
  }, []);

  async function onFetchMoreListing(){
    // Fetch more listings when "Load more" button is clicked
    try {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, where("offer", "==", true), orderBy("timestamp", "desc"), startAfter(lastFetchedListing), limit(4));

      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length-1];
      setLastFetchedListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setListings((prevState)=>[...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error("Could not fetch Listing");
    }
  }



  return (
    <div className='max-w-6xl mx-auto px-3'>
      <h1 className='text-3xl text-center mt-6 font-bold'>
        Offers
      </h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className='mt-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {listings.map((listing)=>(
                  <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
                ))}
              </ul>
            </main>
            {lastFetchedListing && (
              <div className='flex justify-center items-center'>
                <button onClick={onFetchMoreListing} className='bg-white px-3 py-1.5 text-gray-700
                  border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition
                  duration-150 ease-in-out'>Load more</button>
              </div>
            )}
          </>
      ) : (
        <p>There are no more offers</p>
      )}
    </div>
  )
}
