import React from 'react'
import useAuth from '../custom-hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const Protectedadmin = () => {
  const {currentUser,isLoading} = useAuth();
  
  if(isLoading){
    return <p> Is Loading........</p>
  }
  return (currentUser?.email === 'nhan01@gmail.com' ? <Outlet/> : <Navigate to ='/home'/> )
}
export default Protectedadmin
