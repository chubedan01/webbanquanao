import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase.config.js';
import { storage } from '../firebase.config';
import { db } from '../firebase.config.js';
import { toast } from 'react-toastify';
import '../styles/Profile.css'
import useAuth  from '../custom-hooks/useAuth';
import userIcon from '../assets/images/user-icon.png'
import useGetData from "../custom-hooks/useGetData"
// import {useEffect, useState} from 'react'
// import  useAuth  from '../custom-hooks/useAuth';

// import {
//   getDoc,
//   updateDoc,
//   doc,
// } from "firebase/firestore";
// import {onAuthStateChanged } from "firebase/auth"
// import {db,auth} from '../firebase.config'



const Profile = () => {
  const { currentUser } = useAuth(); // Get current user info from useAuth hook
  const userId = currentUser?.uid;
  console.log("currentUser::", currentUser)
  
  const { data: userdata, loading } = useGetData("users");
  console.log("currentUser::", userdata)
  const [username, setUsername] = useState(''); // Initialize with user data if available
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState(''); // Initialize with user data if available
  const [Address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate()
  const naviate = useNavigate();

  const navigateeditprofile =()=>{
    naviate('/updateprofile')
  }

 

  // useEffect(()=>{
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in
  //       setUser(user)
  //       console.log("User is signed in home");
  //       console.log("userId home",user.uid,user.email,user.password,user.username)
  //     } else {
  //       // User is not signed in
  //       setUser(null)
  //       console.log("User is not signed in");
  //     }
  //     return unsubscribe;
  //   });
   
  // },[]);

  
  const filteruser = userdata.filter((user) => user.uid === userId);
 
  return (
    <Helmet>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold"> Loading......</h5>
              </Col>
            ) : (
             
              filteruser.map((user) => (
               
              <Col lg="6" className="information m-auto">
                <h3 className=" Signup fw-bold fs-4 text-center"> THÔNG TIN CÁ NHÂN </h3>
                <Form className="auth_form">
                  <FormGroup className="form_group ">
                  <img className="text-center" src={currentUser? currentUser.photoURL:userIcon}/>
                  </FormGroup>
                  <FormGroup className="text  fw-blod text-white">
												<span className='text-white'> Họ và tên: <br />{" "}</span> 
												<span className="text-primary">
													{user.displayName}
												</span>
                  </FormGroup>
                  <FormGroup className=" text text-white">
												Địa chỉ email: <br />{" "}
												<span className="text-primary">
													{user.email}
												</span>
                  </FormGroup>
                  <FormGroup className="text text-white">
                   
												Số điện thoại: <br />{" "}
												<span className="text-primary">
													{user.PhoneNumber}
												</span>
									 
                  </FormGroup>
                  <FormGroup className="text text-white">
                  
												Địa chỉ: <br />{" "}
												<span className="text-primary">
													{user.Address}
												</span>
			
                  </FormGroup>
                  {/* <FormGroup className="form_group">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup> */}
                  <button type="Submit" className=" edit_btn buy_btn auth_btn" onClick={navigateeditprofile}>
                  {/* <Link to="/updateprofile"></Link>  */}
                    Edit Profile
                  </button>
                </Form>
              </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Profile;
