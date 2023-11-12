import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import logo from '../assets/images/logo.png'
import  "../styles/admin_nav.css"
import useAuth from '../custom-hooks/useAuth'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

const admin_nav = [
  {
    display:'Dashboard',
    path:'/dashboard'
  },
  {
    display:'All-Product',
    path:'/dashboard/all-products'
  },
  {
    display:'Orders',
    path:'/dashboard/orders'
  },
  {
    display:'Users',
    path:'/dashboard/users'
  },
  {
    display:'Add-Products',
    path:'/dashboard/add-products'
  },

]
const AdminNav = () => {
  const {currentUser}= useAuth ()
  return ( 
    <>
  <header className='admin_header'>
    <div className='admin_nav-top'>
      <Container>
      
        <div className='admin_nav-wrapper-top'>
          
        <Link to={"/home"}>
          <div className="logo mt-2"> 
         <img src={logo} alt="logo" />
         <h2 className='text-white'>Multimart</h2>
          </div>
       </Link>

          <div className="search_box">
            <input type="text" placeholder='Search.....' />
            <span>
            <i class="ri-search-2-line"></i>
            </span>
          </div>
            
        <div className='admin_nav-top-right mt-2.5'>
          <span className=' mt-2'><i class="ri-notification-3-line "></i></span>
          <span className=' mt-2'><i class="ri-settings-4-line "></i></span>
          <img src={currentUser?.photoURL} alt="" />
        </div>

        </div>
      
          
        
      </Container>

    </div>
  </header>
    <selection className="admin_menu p-0">
      <Container>
        <Row>
          <div className="admin_navigation">
            <ul className="admin_menu-list">
               {
                 admin_nav.map((item,index) =>(
                  <li className="admin_menu-item" key={index}>
                     <NavLink to={item.path} className={navClass=> navClass.isActive
                       ? 'active_admin-menu' : ''}>{item.display}</NavLink>
                  </li>
                 ))
               }
            </ul>
          </div>
        </Row>
      </Container>
    </selection>
  </>
  )
}

export default AdminNav