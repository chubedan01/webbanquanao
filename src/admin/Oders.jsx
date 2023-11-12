import React, { useContext } from 'react'
import { Container, Row, Col } from 'reactstrap'
import useAuth from '../custom-hooks/useAuth'
import useGetData from "../custom-hooks/useGetData"
import { useParams } from 'react-router-dom';


const Orders = () =>{

  const { data:Oderdata, loading } = useGetData("order");
  const {currentUser} = useAuth();
  const userid = currentUser?.uid;
  const { orderId } = useParams(); // Lấy ID đơn hàng từ URL
  console.log(orderId)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!Oderdata || Oderdata.length === 0) {
    return <p>No orders found.</p>;
  }



  return (
  <section>
    <Container>
      <Row>
     
        <h6 className='mb-4 fw-bold mt-3 text-center'>CHI TIẾT ĐƠN HÀNG <br />
        { Oderdata.filter(user => user.id === orderId)
             .map(user => (
              <p className='mb-2 fw-bold mt-1'>#ID:{user.paymentId}</p>
             ))
               
               }
        </h6>
        <table className='table'>
          <thead>
            <tr>
              <th>IMGAE</th>
              <th>TITLE</th>
              <th>PRICE</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>PHONENUMBER</th>
              <th>DATE</th>
            </tr>
          </thead>

          <tbody>{

            
               loading ? (<h3 className='py-5 text-center fw-bold'>Loading....</h3>) :(


                Oderdata.filter((order) => order.id === orderId).map((Oderdata) => (
                    Oderdata.cartItems.map(item => (
                    <tr key={item.id}>
                    <td><img src={item.imgUrl} alt="" /></td>
                    <td>{item.category}</td>
                    <td>${item.price}</td>
                    <td>{item.productsName}</td>
                    <td>{Oderdata.addressInfo.Address}</td>
                    <td>{Oderdata.addressInfo.PhoneNumber}</td>
                    <td>{Oderdata.date  }</td>
                    {
                      /*
                      <td>
                    <button onClick={() =>
                      {deleteProduct(item.id)}}
                      className='btn btn-danger'>Delete</button>
                    </td>
                      */
                  
                    }
                    
                  </tr>
                   )) 
                  

               ))
                  
               )}
          </tbody>
        </table>
      </Row>
    </Container>
  </section>
  )

}
export default Orders