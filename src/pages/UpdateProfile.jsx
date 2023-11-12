import { useEffect, useState } from 'react'
import useAuth from '../custom-hooks/useAuth';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { storage } from '../firebase.config';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import useGetData from "../custom-hooks/useGetData"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'




import {
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"
import { db, auth } from '../firebase.config'

const UpdateProfile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [file, setFile] = useState(null);
  const { loading } = useGetData("users");
  const naviate = useNavigate()


  const handleUpdate = async (e) => {
    
   


    e.preventDefault()
    try {

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {

      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        // await updateProfile(user, {
        //   displayName: username,
        //   photoURL: downloadURL,
        // });

      const newData = {
        displayName: username,
        email: email,
        PhoneNumber: PhoneNumber,
        photoURL: downloadURL,
      }
      const docRef = doc(db, "users", user.uid);
      console.log("docSnap", docRef)
      await updateDoc(docRef, newData);
      const docSnap = getDoc(docRef);
      
      

    })
  }
      
  ) 
      
      toast.success('Cập nhật thông tin cá nhân thành công!');
      naviate('/profile') 
      
    } catch (error) {
      toast.error('Cập nhật thông tin không thành công!');
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user)
        console.log("User is signed in home");
        console.log("userId home", user.uid, user.email, user.password, user.username)
      } else {
        // User is not signed in
        setUser(null)
        console.log("User is not signed in");
      }
      return unsubscribe;
    });

  }, []);


  
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


              <Col lg="6" className="information m-auto text-center">
                
                <Form className="auth_form">
                <h3 className=" Signup fw-bold fs-4 text-center text-white"> CHỈNH SỬA THÔNG TIN CÁ NHÂN </h3>
                  <FormGroup className="form_group ">
                    <img className="text-center" src={currentUser ? currentUser.photoURL : userIcon} />
                  </FormGroup>

                  <FormGroup className="form_group text-center">
                    <div className="form_group text-center">
                      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                  </FormGroup>

                  <FormGroup className="form_group">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => { setUsername(e.target.value) }}
                    />
                  </FormGroup>

                  <FormGroup className=" form_group">
                    <input
                      type="password"
                      name="PhoneNumber"
                      id="PhoneNumber"
                      placeholder="PhoneNumber"
                      value={PhoneNumber}
                      onChange={(e) => { setPhoneNumber(e.target.value) }}
                    />
                  </FormGroup>

                  <FormGroup className="form_group">

                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }}
                    />

                  </FormGroup>
                  <FormGroup className="form_group">

                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="address"
                      value={address}
                      onChange={(e) => { setAddress(e.target.value) }}

                    />
                  </FormGroup>
                  {/* <FormGroup className="form_group">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup> */}
                  <button type="Submit" className=" buy_btn auth_btn "
                    onClick={handleUpdate}
                  >Update Profile</button>
                </Form>
              </Col>

            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );


}
export default UpdateProfile;  