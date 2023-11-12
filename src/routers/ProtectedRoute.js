import React from 'react';
import useAuth from '../custom-hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    toast.error('Vui lòng đăng nhập!');
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

// import React from 'react'
// import useAuth from '../custom-hooks/useAuth'
// import { Navigate } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'
// const ProtectedRoute = () => {
//   const {currentUser,isLoading} = useAuth();
//   if(isLoading){
//     return <p>Is Loading</p>
//   }
//   return currentUser ? <Outlet/> : {
//     <Navigate to ='/login' />
//     toast.error('Product not found');
//   }
// }

// export default ProtectedRoute