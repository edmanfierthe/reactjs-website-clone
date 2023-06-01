import React, { useEffect, useState } from 'react'
import Slider from '../components/Slider'
import { collection, getDoc, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export default function Home() {

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    async function fetchListings(){
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q)
      let listings = [];
      querySnap.forEach((doc)=>{
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchListings();
  },[])
  return (
    <div>
      <Slider />
    </div>
  )
}
