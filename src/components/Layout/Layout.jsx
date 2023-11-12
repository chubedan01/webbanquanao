import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Router'


import AdminNav from '../../admin/AdminNav'
import {useLocation } from 'react-router-dom'



const Layout = () => {

  const Location = useLocation()
  return (
    <>

    {
      Location.pathname.startsWith('/dashboard') ? <AdminNav/> : <Header/>// nếu người dùng ở trên trang bắt đầu bằng '/dashboard', nếu không nó sẽ hiển thị thành phần <header/>
      // Kiểm tra xem đường dẫn URL hiện tại có bắt đầu bằng '/dashboard' hay không. Nếu đúng (đúng), hãy hiển thị thành phần <AdminNav/>. Nếu không (false), hãy hiển thị thành phần <header/>.
    }
   
    <div>
     <Routers/>
    </div>
    <Footer/>
    </>
  );
};

export default Layout