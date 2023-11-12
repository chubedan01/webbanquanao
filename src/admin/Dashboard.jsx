import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import "../styles/dashboard.css"
import useGetData from '../custom-hooks/useGetData'

const Dashboard = () => {

  const {data: products} =useGetData('products') 
  const {data: users } =useGetData('users') 
  const { data:Oderdata, loading } = useGetData("order");


  function  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(amount);
  }


  let totalAmountForAdmin = 0;
// Lặp qua danh sách đơn đặt hàng
Oderdata.forEach((Oderdata) => {
  // Lặp qua danh sách sản phẩm trong từng đơn đặt hàng
   console.log("Oderdata", totalAmountForAdmin)
  
    // Tính tổng tiền cho sản phẩm hiện tại và cộng vào tổng tiền cho quản trị viên
     totalAmountForAdmin = Oderdata.totalAmount + totalAmountForAdmin;
    
  
});



  
  console.log(totalAmountForAdmin)

  return (
    <>
    <section>
      <Container>
        <Row>
          <Col className='lg-3'>
          <div className='revenue_box'>
            <h5>Total Sale</h5>
            <span>7890 VND</span>    
          </div>
          </Col>
           <Col className='lg-3'>
             <div className='oder_box'>
             <h5>Orders</h5>
             <span>${formatCurrency(totalAmountForAdmin)}</span>
             </div>
             
           </Col>
           <Col className='lg-3'>
            <div className='Products_box'>
            <h5>Products</h5>
            <span>{products.length}</span>
            </div>
             
           </Col>
           <Col className='lg-3'>
           <div className='users_box'>
           <h5>Total users</h5>
            <span>{users.length}</span>
           </div>
             
           </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}

export default Dashboard