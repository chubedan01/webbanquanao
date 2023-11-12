import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'

const User = () => {
  const {data: usersData, loading} = useGetData('users')
  //console.log(usersData)
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
          </Col>
          <Col lg='12'></Col>
          <table className='table'>
            <thead>
              <tr>
                <th>Image</th>
                <th>Username</th>
                <th>PhoneNumber</th>
                <th>Address</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
            {
              loading ?(<h5 className='pt-5 fw-bold'>Loading....</h5>):(
                usersData?.map(user => (
                  <tr key={user.uid}>
                    <td>
                      <img src={user.photoURL} alt="" />
                    </td>
                    <td>{user.displayName}</td>
                    <td>{user.PhoneNumber}</td>
                    <td>{user.Address}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className='btn btn-danger'>Delete</button>{
                      ""
                      }
                    </td>
                  </tr>
                ))
              )
            }
            </tbody>
          </table>
        </Row>
      </Container>
    </section>
  )
}

export default User