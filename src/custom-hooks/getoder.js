import React, { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

const useGetOrder = () => {
  const [order, setOrder] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "order"));
      const ordersArray = [];
      querySnapshot.forEach((doc) => {
        ordersArray.push(doc.data());
      });
      setOrder(ordersArray);
      setLoading(false);
    }

    fetchData();
  }, []);

  return {
    order,
  };
};

export default useGetOrder;