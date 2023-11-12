import React, { useRef, useEffect } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import './header.css'
import { motion } from 'framer-motion'
import logo from '../../assets/images/logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { Container, Row } from 'reactstrap'
import { useSelector } from 'react-redux'

import useAuth from '../../custom-hooks/useAuth'
import { signOut } from "firebase/auth"
import { toast } from 'react-toastify'
import { auth } from '../../firebase.config.js'

//
const nav__link = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  },
]
const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity)// lam tang so hien o gio hang khi click them vao gio hang

  const profileActionRef = useRef(null)
  const menuRef = useRef(null);

  const navigate = useNavigate();
  
  const navigateToCart = () => {
    navigate('/cart')
  }

// const navigatehome= () => {
//     navigate('/cart')
//   }
  



  const { currentUser } = useAuth();//ham lay thong tin nguoi dung dang dang nhap

  


  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };
  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Đăng xuất thành công!')
      navigate('/home')
    }).catch(err => {
      toast.error(err.message)
    })
    
  }


  
  /*
   1. `useEffect(() => {` - Điều này thiết lập một hiệu ứng mới sẽ được thực thi sau khi kết xuất.
   2. `stickyheaderfunc();` - Nó gọi hàm `stickyheaderfunc`, có lẽ là để khởi tạo hành vi tiêu đề cố định.
   3.`return () => window.removeEventListener('scroll', stickyheaderfunc);` 
   - Hàm này chỉ định chức năng dọn dẹp sẽ được gọi khi ngắt kết nối thành phần. Nó loại bỏ trình xử lý sự kiện cho sự kiện cuộn bằng cách sử dụng `removeEventListener`
  
  */
  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const menuTonggle = () => menuRef.current.classList.toggle('active_menu')

  const tonggleProfileActions = () => {
    const profileActions = document.querySelector('.profile_actions');
    profileActions.classList.toggle('show');
  };


  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>

          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo"/>
              <div>
                <h1>Men's office fashion</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuTonggle}>
              <ul className="menu">
                {/**
              * <li className="nav_item">
              <NavLink to='home'>Home</NavLink>
             </li>
             <li className="nav_item">
              <NavLink to='shop'>Shop</NavLink>
             </li>
             <li className="nav_item">
              <NavLink to='cart'>Cart</NavLink>
             </li>
             nó sẽ tương tự cho những lệnh sau đây
              */}
                {nav__link.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink to={item.path} className={(navClass) =>
                      navClass.isActive ? 'nav_active' : ''}>{item.display}</NavLink>
                  </li>
                ))}

                {
                  <li className="nav_item">
                    {currentUser?.email === 'nhan01@gmail.com' ?
                      <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 ">
                        Admin
                      </Link> : ""}
                  </li>
                }

              </ul>


            </div>




            <div className="nav_icons">
              <span className="fav__icon">
                <span className="badge">1</span>
                <i class="ri-heart-line"></i>
              </span>
              <span className="cart_icon" onClick={navigateToCart}>
                <span className="badge">{totalQuantity}</span>
                <i class="ri-shopping-bag-3-line"></i>
              </span>


              <div className="profile">
                <motion.img whileTap={{ scale: 1.2 }} src={currentUser? currentUser.photoURL : userIcon} onClick={tonggleProfileActions} />
                <div className="profile_actions" ref={profileActionRef} onClick={tonggleProfileActions}>
                  {currentUser? (
                    <>
                     <div>
                    <span onClick={logout}>Logout</span>
                    </div>
                    <div>
                      <span> <Link to="/myorders">My Order</Link></span>
                    </div>
                    <div>
                      <span> <Link to="/profile">My Profile</Link></span>
                    </div>
                    </>
                   
                  ) : (
                    <div className='notlogin d-flex align-center justify-content-center flex-column '>
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                      {/* <Link to="/dashboard">Dashboard</Link> */}
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile_menu">
                <span onClick={menuTonggle} >
                  <i class="ri-menu-line"></i>
                </span>
              </div>

            </div>
          </div>
          {




          }

        </Row>
      </Container>
    </header>


  );
}

export default Header