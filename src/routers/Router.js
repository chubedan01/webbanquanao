import { Routes, Route, Navigate} from "react-router-dom"
import React from "react"
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ResetPassword from "../pages/ResetPassword"
import MyOrders from '../pages/MyOrders'
import UpdateProfile from '../pages/UpdateProfile'
import ProtectedRoute from "./ProtectedRoute"
import Protectedadmin from "./Protectedadmin"
import Checkoutdetails from "../pages/Checkoutdetails"
import MyOrdersdetails from "../pages/MyOrdersdetails"
import Profile from "../pages/Profile"

import AddProducts from "../admin/AddProducts"
import AllProducts from "../admin/AllProducts"
import Dashboard from "../admin/Dashboard"
import User from "../admin/User"
import Orders from "../admin/Oders"
import AdOrders from "../admin/AdOrders"


const Routers = () => {
  return <Routes>

    <Route path="/" element={<Navigate to='/home'/>}/>
    <Route path="home" element={<Home/>}/>
    <Route path="shop" element={<Shop/>}/>
    <Route path="shop/:id" element={<ProductDetails/>}/>
    <Route path="cart" element={<Cart/>}/>

     <Route path="/*" element={<ProtectedRoute/>}>
       <Route path="checkout" element={<Checkout/>}/>
       <Route path="checkoutdetails" element={<Checkoutdetails/>}/>
       <Route path="myorders" element={<MyOrders/>}/>
       <Route path="myordersdetails" element={<MyOrdersdetails/>}/>
       <Route path="profile" element={<Profile/>}/>
       <Route path="updateprofile" element={<UpdateProfile/>}/>
       <Route path="/*" element={<Protectedadmin/>}> 
              <Route path="dashboard" element={ <Dashboard/>}/>
              <Route path="dashboard/all-products" element={<AllProducts/>}/>
              <Route path="dashboard/add-products" element={<AddProducts/> }/>
              <Route path="dashboard/users" element={<User/>} />
              <Route path="dashboard/orders" element={<AdOrders/>} />
              <Route path="dashboard/orders/:orderId" element={<Orders/>} />
       </Route>   
     </Route>

   

    <Route path="login" element={<Login/>}/>
    <Route path="signup" element={<Signup/>}/>
    <Route path="resetpassword" element={<ResetPassword/>}/>
  </Routes>
}

export default Routers

