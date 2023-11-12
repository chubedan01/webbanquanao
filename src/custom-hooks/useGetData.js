import React, { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, onSnapshot } from 'firebase/firestore';

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [collectionName]);

  return { data, loading };
};

export default useGetData;

/*import React, { useEffect, useState } from 'react'
import {db} from '../firebase.config'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'


const useGetData = collectionName => {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const collectionRef = collection(db, collectionName)
   useEffect (() => {

    
       const getData = async()=>{

      // firebase realtime update
       await onSnapshot(collectionRef, snapshot =>
       {
        setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
        setLoading(false);
    
       })
     
      }
      getData();
   }, [collectionRef]);
  return {data, loading};
};
export default useGetData*/