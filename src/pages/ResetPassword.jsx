import React, { useState } from "react";
import { toast } from "react-toastify";
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { useNavigate } from 'react-router-dom';


// FIREBASE
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase.config.js';
import  '../styles/resetpassword.css'

const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState("");
  const navigate = useNavigate()
	const resetPasswordHandler = (e) => {
		e.preventDefault();
		setIsLoading(true);
		sendPasswordResetEmail(auth, email)
			.then(() => {
				toast.info("Check email for reset link");
				setErr("Check your Registered email address for reset link *(Check Spam)*");
				setIsLoading(false);
				setEmail("");
        navigate('/login')
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setErr(`${errorCode} : ${errorMessage}`);
				setIsLoading(false);
			});
     
	};

	return (

    <section>
    <Container>
      <Row>
       {
         isLoading? <Col lg='12' className='text-center'>
           <h5 className='fw-bold'>Loading.....</h5></Col> :
          <Col lg='6' className='m-auto text-center'>
              <h3 className='Login fw-bold fs-4'> RESET PASSWORD</h3>
              
              <Form className='auth_form' onSubmit={resetPasswordHandler}>

<FormGroup className='form_group'>
<div className=" notion alert shadow-lg text-white-700 border-l-4 border-primary my-4">
						Please enter your registered Email address. You will receive an email
						message with instructions on how to reset your password
					</div>
<input type="email" placeholder='Enter your email Address' 
value={email} onChange={e => setEmail(e.target.value)}/>
</FormGroup>
<button type='Submit' className='buy_btn auth_btn'> 
Get new Password
</button>

</Form>
          </Col>
       }
      </Row>
    </Container>
  </section>
		// <>
		// 	{isLoading}

		// 	<main className="w-full page flex items-center justify-center">
		// 		<div className="w-96 h-auto shadow-xl rounded-md px-4 py-6">
		// 			<h1 className="text-2xl font-bold text-center ">RESET PASSWORD</h1>
		// 			{err && (
		// 				<h1 className="alert shadow-lg text-gray-700 border-l-4 border-error my-4">
		// 					{err}
		// 				</h1>
		// 			)}
				

  


		// 			{/* <form className="form-control" onSubmit={resetPasswordHandler}>
		// 				<label className="label-text font-bold mb-2 block">Email Address</label>
		// 				<input
		// 					type="email"
		// 					className="input input-bordered input-secondary w-full"
		// 					value={email}
		// 					onChange={(e) => setEmail(e.target.value)}
		// 				/>
		// 				<button type="submit" className="btn mt-3">
		// 					Get new Password
		// 				</button>
		// 			</form> */}
		// 		</div>
		// 	</main>
		// </>
	);
};

export default ResetPassword;