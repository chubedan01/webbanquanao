import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetData from "../custom-hooks/useGetData"
import { toast } from 'react-toastify'

const AllProducts = () => {
  const { data: productsData, loading } = useGetData("products");
  //console.log(productsData)

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db,'products', id))
    toast.success("xóa sản phẩm thành công!")
  }
  return ( <section>
    <Container>
      <Row>
        <Col lg='12'>
          <table className='table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Catefory</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             {
               loading ? (<h3 className='py-5 text-center fw-bold'>Loading....</h3>) :(
                
                  productsData.map(item => (
                   <tr key={item.id}>
                   <td><img src={item.imgUrl} alt="" /></td>
                   <td>{item.productsName}</td>
                   <td>{item.category}</td>
                   <td>${item.price}</td>
                   <td>{item.quantity}</td>
                   <td>{item.description}</td>
                   <td>
                   <button onClick={() =>
                     {deleteProduct(item.id)}}
                     className='btn btn-danger'>Delete</button>
                   </td>
                 </tr>
                  )) 
               )}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  </section>
   
  )
}

export default AllProducts