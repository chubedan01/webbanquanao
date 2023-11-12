

import React from 'react'

import "../styles/cart.css"
import Helmet from "../components/Helmet/Helmet"
import CommonSection from '../components/IU/CommonSection'
import { Container, Row, Col } from 'reactstrap'


import { motion } from 'framer-motion'
import { cartActions } from '../redux/slicse/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useGetData from '../custom-hooks/useGetData'
import { collection, doc, updateDoc } from 'firebase/firestore'; // Import doc here
import useAuth from '../custom-hooks/useAuth'
import { db } from '../firebase.config';


const Cart = () => {

  const naviate = useNavigate();
  const { currentUser } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const navigateCheckout = () => {
    // Check if there are enough products in the cart
    if (checkProductAvailability()) {
      // Proceed to checkout
      naviate('/checkout');
    } else {
      // Show an error message or redirect to a product page with a message
      naviate('/shop?error=insufficient-quantity');
    }
  };

  // Function to check if there are enough products in the cart
  const checkProductAvailability = () => {
    let allProductsAvailable = true;
    for (const item of cartItems) {
      // Replace 'products' with the actual collection name in your Firebase
      const productRef = doc(db, 'products', item.id);

      // Check if the quantity in the cart is available in Firebase
      if (item.quantity > item.availableQuantity) {
        allProductsAvailable = false;
        break;
      }
    }
    return allProductsAvailable;
  };

  // Function to update product quantities in Firebase
  const updateProductQuantities = async () => {
    for (const item of cartItems) {
      // Replace 'products' with the actual collection name in your Firebase
      const productRef = doc(db, 'products', item.id);

      // Subtract the quantity in the cart from the available quantity in Firebase
      await updateDoc(productRef, {
        quantity: item.availableQuantity - item.quantity,
      });
    }
  };

  const navigatecontinuteshop = () => {
    naviate('/shop');
  };


  return (
    <Helmet title='Cart'>
    <CommonSection title='SHOPING CART'/>
     <section>
     <Container>
        <Row>
          <Col lg='9'>
            {
              cartItems.length===0 ? (
                <h2 className='notion fs-4 text-center'> No item added to cart</h2>
              ):
              (  <table className='table bordered'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th >Delete</th>
                </tr>
              </thead>

              <tbody>
                {
                  cartItems.map((item,index)=>(
                    <Tr item={item} key ={indexedDB}/>
                  ))
                }
              </tbody>
                 </table>)
            }
          
          </Col>
          <Col lg='3'>
            <div className='Subtotal'>
              <h6 className='d-flex align-items-center justify-content-between'>
                Tổng
                <span className='Subtotal fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              
            </div>
            <p className='fs-6 mt-2'>Phí ship và địa chỉ nhận hàng trong phần thanh toán</p>
            <div>
              

                <button className='buy_btn w-100 '  onClick={navigateCheckout}>
                <Link to='/checkout'></Link> 
               Thanh toán</button>

                <button className='buy_btn w-100 mt-3' onClick={navigatecontinuteshop}>
                <Link to="/shop"></Link> 
                 Tiếp tục mua sắm
                </button>
            </div>
                    </Col>
        </Row>
      </Container>
     </section>
    </Helmet>
  )
}
const Tr = ({item}) =>{
   
  const dispatch = useDispatch()
  const deleteProduct = () =>{
    dispatch(cartActions.deleteItem(item.id))
  }
  console.log(deleteProduct)

  return  (
    <tr >
    <td><img src={item.imgUrl} alt="" /></td>
    <td>{item.productsName}</td>
    <td>{item.price}</td>
    <td>{item.quantity}</td>
    <td className='delete'>
    <motion.i 
    whileTap={{scale:1.2}}
    onClick={deleteProduct}
    class="ri-delete-bin-line"></motion.i>
    </td>
    {/* <div><p className='fw-bold'>Tên sản phẩm:</p> {item.productsName} </div>
    <p className='fw-bold'>Giá:</p>{item.price}
    <p className='fw-bold'>Số lượng:</p>{item.quantity}
     */}
  </tr>
  )
}
export default Cart