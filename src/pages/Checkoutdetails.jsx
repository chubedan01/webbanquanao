
import React from 'react'
import { Container, Row, Col,Form, FormGroup } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import '../styles/checkout.css'
import CommonSection from "../components/IU/CommonSection"
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage} from '../firebase.config'
import { addDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import useAuth from '../custom-hooks/useAuth'
const Checkoutdetails = () => {

  const { currentUser } = useAuth();
  const navigate = useNavigate()
  
  const totalQty = useSelector((state) =>state.cart.totalQuantity)
  const totalAmount = useSelector((state) =>state.cart.totalAmount)
  const cartItems = useSelector((state) => state.cart.cartItems);
    // Sử dụng currentUser để điền sẵn thông tin người dùng nếu có
  
  const [Username, setUsername] = useState(currentUser ? currentUser.displayName : ''); // Initialize with user data if available
  const [Email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [PhoneNumber, setPhoneNumber] = useState(currentUser ? currentUser.PhoneNumber : ''); // Initialize with user data if available
  const [Address, setAddress] = useState(currentUser ? currentUser.Address : '');
  const [Pincode, setPincode] = useState("")
  const [enterProductImg, setEnterProductImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  }
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const buyNow = async () => {


        // validation 
        if (Username === "" || Address == "" || Email == "" || PhoneNumber == "") {
          return toast.error("All fields are required", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
        }
    const addressInfo = {
        Username,
        Email,
        Address,
        PhoneNumber,
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    }
    var options = {
        key: "rzp_test_mCxs2iRSCoKAu0",
        key_secret: "quxH578fPUmge22wbkSVQ7us",
        amount: parseInt(totalAmount * 100),
        currency: "INR",
        order_receipt: 'order_rcptid_' + Username,
        name: "E-Bharat",
        description: "for testing purpose",
        handler: function (response) {
            console.log(response)
            toast.success('Payment Successful')
            const paymentId = response.razorpay_payment_id;
            const orderInfo = {
                cartItems,
                addressInfo,
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                ),
                email: currentUser?.email,
                userid: currentUser?.uid,
                paymentId,
                totalAmount
            }
            try {
                const orderRef = collection(db, 'order')
                addDoc(orderRef, orderInfo);
            } catch (error) {
                console.log(error)
            }
        },
        theme: {
            color: "#3399cc"
        }
    }
    
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
    navigate('/myorders')
}
  return (
   <Helmet title="checkout">
     <CommonSection title="CHECKOUT"/>
       <section>
         <Container>
           <Row>
             {/*tao khung dien thong tin thanh toan */}
             <Col lg='8' className='Billing'>
               <h6 className=' mb-4 fw-bold mt-3'>Thông tin nhận hàng</h6>
               <Form className=''>
                 <FormGroup className='form_group'>
                   <span>Enter your name</span>
                   <input type="text" 
                   placeholder='Enter your name' 
                   value={Username}
                   onChange={handleNameChange}
                  //  onChange={e => setName(e.target.value)} 
                   />
                    
                 </FormGroup>
                 <FormGroup className='form_group'>
                   <span>Email</span>
                   <input type="email" placeholder='Enter email name'
                    value={Email}
                    onChange={handleEmailChange}
                    // onChange={(e) => setEmail(e.target.value)} 
                    />
                 </FormGroup>
                 <FormGroup className='form_group'>
                   <span>Number Phone</span>
                   <input type="number" placeholder='Phone number'
                   value={PhoneNumber}
                   onChange={(e) => setPhoneNumber(e.target.value)} 
                    />
                 </FormGroup>
                 <FormGroup className='form_group'>
                    <span>Address</span>
                   <input type="text" placeholder='Street address'
                   value={Address}
                   onChange={(e) => setAddress(e.target.value)}  />
                 </FormGroup>
                 {/* <FormGroup className='form_group'>
                   <span>Pincode</span>
                   <input type="text" placeholder='Postal code'
                   value={Pincode}
                   onChange={e => setPincode(e.target.value)} />
                 </FormGroup> */}
               </Form>
             </Col>
             <Col >
             <div className='checkout_cart mt-5' >
               <h6>Số lượng sản phẩm: <span> {totalQty} items</span></h6>
               <h6>Tổng: <span>${totalAmount}</span></h6>
               <h6> 
                 <span> 
                 Shipping: <br /> 
                 free shipping
                 </span>
                 <span> $0</span>
               </h6>
               <h4>
                Tổng: <span>${totalAmount}</span>
               </h4>
               <button className='buy_btn auth_btn w-100 mt-2' onClick={buyNow}> 
               Thanh toán
              </button>
             </div>
              
             </Col>
           </Row>
         </Container>
       </section>
   </Helmet>
  )
}
export default Checkoutdetails
