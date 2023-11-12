
import React from 'react'
import { Container, Row, Col,Form, FormGroup, Label } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import '../styles/checkout.css'
import CommonSection from "../components/IU/CommonSection"
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import { Link, useNavigate} from 'react-router-dom'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage} from '../firebase.config'
import { addDoc, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth'
import useAuth from '../custom-hooks/useAuth'
import useGetData from "../custom-hooks/useGetData";



const Checkout = () => {


  const { data: users, loading: userLoading } = useGetData("users");
  console.log(users)
   
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  
  const navigate = useNavigate()
  const navigatecheckout=()=>{
    navigate('/checkoutdetails')
  }
  
  
  const totalQty = useSelector((state) =>state.cart.totalQuantity)
  const totalAmount = useSelector((state) =>state.cart.totalAmount)
  
  

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("fwef",cartItems)
    // Sử dụng currentUser để điền sẵn thông tin người dùng nếu có
  
  const [Username, setUsername] = useState(''); // Initialize with user data if available
  const [Email, setEmail] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState(''); // Initialize with user data if available
  const [Address, setAddress] = useState('');
  const [loading, setLoading] = useState(false)


  // Function to update the PhoneNumber based on the user's data
  useEffect(() => {
    if (userId) {
      const user = users.find((user) => user.uid === userId);
      if (user) {
        setUsername(user.displayName || ''); // Set PhoneNumber from user data, or an empty string if not available
      }
    }
  }, [userId, users]);

  useEffect(() => {
    if (userId) {
      const user = users.find((user) => user.uid === userId);
      if (user) {
        setPhoneNumber(user.PhoneNumber || ''); // Set PhoneNumber from user data, or an empty string if not available
      }
    }
  }, [userId, users]);

  useEffect(() => {
    if (userId) {
      const user = users.find((user) => user.uid === userId);
      if (user) {
        setAddress(user.Address || ''); // Set PhoneNumber from user data, or an empty string if not available
      }
    }
  }, [userId, users]);

  useEffect(() => {
    if (userId) {
      const user = users.find((user) => user.uid === userId);
      if (user) {
        setEmail(user.email || ''); // Set PhoneNumber from user data, or an empty string if not available
      }
    }
  }, [userId, users]);


  const buyNow = async () => {

        // // validation 
        // if (Username === "" || Address == "" || Pincode == "" || PhoneNumber == "") {
        //   return toast.error("All fields are required", {
        //     position: "top-center",
        //     autoClose: 1000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "colored",
        //   })
        // }

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
    // const amountInCents = parseInt(totalAmount * 10000);
    // console.log(amountInCents)
    var options = {
        key: "rzp_test_mCxs2iRSCoKAu0",
        key_secret: "quxH578fPUmge22wbkSVQ7us",
        amount: totalAmount,
        currency: "USD",
        order_receipt: 'order_rcptid_' + Username,
        name: "Thanh toán online",
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
                totalAmount,
                Status:"Đã thanh toán"
            }

            try {
                const orderRef = collection(db, 'order')
                addDoc(orderRef, orderInfo);

                const updateProductQuantities = async () => {
                  for (const item of cartItems) {
                    console.log("item", item.quantity)
                    // Replace 'products' with the actual collection name in your Firebase
                    const productRef = doc(db, 'products', item.id);
              
                    try {
                      // Get the product document
                      const productSnapshot = await getDoc(productRef);
              
                      if (productSnapshot.exists()) {
                        const productData = productSnapshot.data();
                        console.log("productData", productData)
              
                        if (productData.quantity >= item.quantity) {
                          // Calculate the new available quantity after purchase
                          const newQuantity = productData.quantity - item.quantity;
              
                          // Update the product's availableQuantity in Firebase
                          await updateDoc(productRef, { quantity: newQuantity });
                        } else {
                          // Handle the case where the quantity goes negative (out of stock)
                          // You may want to display an error message or take appropriate action
                          toast.error('Product is out of stock');
                        }
                      }
                    } catch (error) {
                      console.error("Error updating product quantity:", error);
                    }
                  }
                };
                updateProductQuantities();


                // const productsRef = collection(db, 'products');
              //   cartItems.forEach(async (cartItem) => {
              //   const productDocRef = doc(productsRef, cartItem.productId);
          
              //     try {
                    
              //         // const productSnapshot = await getDoc(productDocRef);
              //         // if (productSnapshot.exists()) {
              //         //     const productData = productSnapshot.data();
              //         //     const newQuantity = productData.quantity - cartItem.quantity;
          
              //         //     if (newQuantity >= 0) {
              //         //         // Update the product's quantity in Firebase
              //         //         await updateDoc(productDocRef, { quantity: newQuantity });
              //         //     } else {
              //         //         // Handle the case where the quantity goes negative (out of stock)
              //         //         // You may want to display an error message or take appropriate action
              //         //     }
              //         // }
              //     } catch (error) {
              //         console.error("Error updating product quantity:", error);
              //     }
              // });


            } catch (error) {
                console.log(error)
            }

            // Loop through the cart items and update the quantity for each product
            
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
        <Col  lg='9' className='Billing'>
        <h6 className='mb-4 fw-bold mt-3'>Thông tin nhận hàng</h6>
         
        <table className='table'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>PHONENUMBER</th>
              <th>ADDRESS</th>
              {/* <th>THAY ĐỔI</th> */}
            </tr>
          </thead>

          <tbody>{loading ? (
              <tr>
                <td colSpan="10" className='text-center fw-bold'>Loading....</td>
              </tr>
            ) : (
              users.filter(user => user.uid === userId)
              .map(user => (
                  <tr key={user.id}>
                    <td>{user.displayName}</td>
                    <td>{user.PhoneNumber}</td>
                    <td>{user.Address}</td> 
                    <td> <button onClick={navigatecheckout}
                     className='btn btn-danger'>Thay đổi</button>
                    </td>
                  </tr>
                ))
            )
            }    
          </tbody>
        </table>
        </Col>
        <Col >
             <div className='checkout checkout_cart mt-5' >
               <h6>Số lượng: <span> {totalQty} sản phẩm</span></h6>
               <h6>Tổng: <span> ${totalAmount}</span></h6>
               <h6> 
            
                 Shipping: <br /> free shipping <span> $0</span>
            
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

export default Checkout