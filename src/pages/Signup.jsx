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
import '../styles/login.css';
import  useAuth  from '../custom-hooks/useAuth'; // Import useAuth hook


const Signup = () => {
  const { currentUser } = useAuth(); // Get current user info from useAuth hook
  const [username, setUsername] = useState(currentUser ? currentUser.displayName : ''); // Initialize with user data if available
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [password, setPassword] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState(currentUser ? currentUser.PhoneNumber : ''); // Initialize with user data if available
  const [Address, setAddress] = useState(currentUser ? currentUser.Address : '');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  

  const signup = async (e) => {

   

    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);// tao user

      const user = userCredential.user;
      
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              PhoneNumber,
              Address,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success('Account created');
      navigate('/login')
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

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
              <Col lg="6" className="m-auto text-center">
                <h3 className="Signup fw-bold fs-4"> Signup </h3>
                <Form className="auth_form" onSubmit={signup}>
                {/*   */}
                  <FormGroup className="form_group">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="number"
                      placeholder="Enter your phonenumber"
                      value={PhoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input
                      type="text"
                      placeholder="Enter your Addres"
                      value={Address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form_group">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                  </FormGroup>
                  <button type="Submit" className="buy_btn auth_btn">
                    Create an Account
                  </button>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Signup;
