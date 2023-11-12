import React, { useContext, useState} from 'react';
import { Container, Row, Col } from 'reactstrap';
import useAuth from '../custom-hooks/useAuth';
import useGetData from "../custom-hooks/useGetData";
import { Helmet } from "react-helmet";
import CommonSection from "../components/IU/CommonSection"
import {Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../firebase.config';
import { doc, deleteDoc,updateDoc } from 'firebase/firestore'







const AdOrders = () => {
    const [Status, setStatus] = useState("");
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

    const handleUpdate = async (orderId) => {
      console.log(orderId)

   


      // orderId.preventDefault()
      try {
  
        // const storageRef = ref(storage, `images/${Date.now() + username}`);
        // const uploadTask = uploadBytesResumable(storageRef, file);
  
        // uploadTask.on(
        //   (error) => {
        //     toast.error(error.message);
        //   },
        //   () => {
  
        // getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // await updateProfile(user, {
          //   displayName: username,
          //   photoURL: downloadURL,
          // });
  
          const orderDocRef = doc(db, "order", orderId);
          console.log("orderDocRef", orderDocRef)
          console.log(Status)
          
          // const newData = {
          //  Status:Status
          // }

          // Cập nhật trường "Status" với giá trị mới
          await updateDoc(orderDocRef, {
            Status: Status,
          });
          // Hiển thị thông báo hoặc thực hiện các xử lý khác nếu cần
          // ...
    
          // Sau khi cập nhật thành công, bạn có thể cập nhật lại trạng thái trên giao diện
          setStatus(Status);
        toast.success('Cập nhật thông tin cá nhân thành công!');
        
        
      } catch (error) {
        toast.error('Cập nhật thông tin không thành công!');
      }
    }

    const navigateOderdetail =(orderId)=>{
      naviate(`/dashboard/orders/${orderId}`)
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
             <th>Họ tên:</th>
             <th>Địa chỉ giao hàng:</th>
             <th>Giá trị đơn hàng:</th>
             <th>Trạng thái:</th>
             <th>Chi tiết:</th>
             <th>Cập nhật:</th>
           
             
             {/* <th>THAY ĐỔI</th> */}
           </tr>
         </thead>

         <tbody>{ orderLoading ? (
             <tr>
               <td colSpan="10" className='text-center fw-bold'>Loading....</td>
             </tr>
           ) : (
            OrderData.map(user => (
                    <tr key={user.id}>
                     <td>{user.paymentId}</td>
                      <td>{user.date}</td>
                      <td>{user.addressInfo.Username}</td> 
                      <td>{user.addressInfo.Address}</td>
                      <td>${user.totalAmount}</td>
                      <td className=" text-primary text-gray-500 text-sm md:text-lg">{
                         <select
                         className="w-100 p-2"
                         value={user.Status}
                         onChange={(e) => setStatus(e.target.value)}
                       >
                         <option value="Đã thanh toán">Đã thanh toán</option>
                         <option value="Đang giao">Đang giao</option>
                         {/* <option value="giaytay">Giày tây</option>
                         <option value="thatlung">Thắt lưng</option> */}
                         {/* <option value="vi">Ví</option> */}
                       </select>
                      }</td>
                      <td>
                      <button onClick={() => navigateOderdetail(user.id)} className='btn btn-danger'>Xem</button>
                      </td>
                      <td>
                   <button onClick={() => handleUpdate(user.id)}
                     className='btn btn-danger'>Update</button>
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

export default AdOrders; 