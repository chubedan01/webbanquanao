import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import useAuth from '../custom-hooks/useAuth';
import useGetData from "../custom-hooks/useGetData";

const MyOrdersdetails = () => {
  const { data:Oderdata, loading } = useGetData("order");
  const { data: users, loading: userLoading } = useGetData("users");
  const {currentUser} = useAuth();
  const userid = currentUser?.uid;
  const { orderId } = useParams(); // Lấy ID đơn hàng từ URL
   
   
  
    if (orderLoading || userLoading) {
      return <p>Loading...</p>;
    }
  
    if (!OrderData || OrderData.length === 0) {
      return <p>No orders found.</p>;
    }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h3 className='fw-bold text-center'>CHI TIẾT ĐƠN HÀNG</h3>
          </Col>
        </Row>
        <table className='table'>
          <thead>
            <tr>
              <th>PAYMENT ID</th>
              <th>IMGAE</th>
              <th>TITLE</th>
              <th>PRICE</th>
              <th>ADDRESS</th>
              <th>PHONENUMBER</th>
              <th>EMAIL</th>
              <th>DATE</th>
            </tr>
          </thead>
          <tbody>
            {orderLoading  ? (
              <tr>
                <td colSpan="10" className='text-center fw-bold'>Loading....</td>
              </tr>
            ) : (
              Oderdata.filter((order) => order.id === orderId).map((Oderdata) => (
                Oderdata.cartItems.map(item => (
                    <tr key={item.id}>
                      <td>{order.paymentId}</td>
                      <td><img src={item.imgUrl} alt="" /></td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{order.addressInfo.Address}</td>
                      <td>{order.addressInfo.PhoneNumber}</td>
                      <td>{order.addressInfo.Email}</td>
                      <td>{order.date}</td>
                    </tr>
                  ))
                ))
            )}
          </tbody>
        </table>
      </Container>
    </section>
  );
};

export default MyOrdersdetails;