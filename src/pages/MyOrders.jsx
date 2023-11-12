import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import useAuth from '../custom-hooks/useAuth';
import useGetData from "../custom-hooks/useGetData";
import { Helmet } from "react-helmet";
import CommonSection from "../components/IU/CommonSection"
import {useNavigate } from 'react-router-dom';



const MyOrders = () => {
    const { data: OrderData, loading: orderLoading } = useGetData("order");
    const { data: users, loading: userLoading } = useGetData("users");
    const naviate = useNavigate();

   
    const { currentUser } = useAuth();
    const userId = currentUser?.uid;
  
    if (orderLoading || userLoading) {
      return <p>Loading...</p>;
    }
  
    if (!OrderData || OrderData.length === 0) {
      return <p>No orders found.</p>;
    }

    const navigateOderdetail =(orderId)=>{
      naviate(`/myorders/${orderId}`)
    }

  return (
      <section>
      <Container>
     <Row>
       <Col className='Billing'>
       <h6 className='mb-4 fw-bold mt-3 text-center'>LỊCH SỬ MUA HÀNG</h6>
       {/* { OrderData.filter(user => user.userid === userId)
             .map(user => (
              <p className='mb-2 fw-bold mt-1'>Mã đơn:{user.paymentId}</p>
             ))
               
               } */}
      
    
      
        
       <table className='table'>
         <thead>
           <tr>
           <th>Mã đơn:</th>
             <th>Ngày đặt hàng:</th>
             <th>Địa chỉ giao hàng:</th>
             <th>Giá trị đơn hàng:</th>
             <th>Trạng thái:</th>
             <th>Chi tiết:</th>
           
             
             {/* <th>THAY ĐỔI</th> */}
           </tr>
         </thead>

         <tbody>{ 
         orderLoading? (
             <tr>
               <td colSpan="10" className='text-center fw-bold'>Loading....</td>
             </tr>
           ) : (
            OrderData.filter(user => user.userid === userId)
             .map(user => (
               
                    <tr key={user.id}>
                     <td>{user.paymentId}</td>
                      <td>{user.date}</td>
                      <td>{user.addressInfo.Address}</td> 
                      <td>${user.totalAmount}</td>
                      <td className=" text-primary text-gray-500 text-sm md:text-lg">{user.Status}</td>
                      <td>
                      <button onClick={() => navigateOderdetail(user.id)} className='btn btn-danger'>Chi tiết</button>
                      </td>

                      
                   
                   {/* <td>
                   <td className=' fw-bold'> <Link to="/checkoutdetails">Thay đổi</Link></td>
                   </td> */}
                 </tr>
              
               
              
               ))
           )
           }    
         </tbody>
       </table>
       </Col>
     </Row>
     <Row>
       
       
     </Row>
   </Container>
      </section>
  );
};

export default MyOrders; 