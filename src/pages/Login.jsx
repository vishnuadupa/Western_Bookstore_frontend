import React from 'react'
import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { determineUserType } from '../utils/getUserType';
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../app/features/cart/authSlice';
import { Link } from 'react-router-dom';
const Login = ({ onLogin }) => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const dispatch = useDispatch(); // Get dispatch function from Redux
 const [userMobile,setUserMobileNumber]=useState('')
 const [userPassword,setUserPassword]=useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      const userType = await determineUserType(userMobile, userPassword);
      // console.log(userType,"gdjgbakjdkjagkjk");
      
    
      // Conditionally dispatch login based on userType
      if (userType === 'customer' || userType === 'seller') {
        const isAdmin = userType ; // Example: Only sellers are admins
        dispatch(login({ isAdmin }));
        toast.success('Login successful!');
        
        
        navigate('/home');
      } else {
        toast.error('Login failed: Invalid user type');
      }
    };
    
  return (
<div className="d-lg-flex half">
  <div className="bg order-1 order-md-2 rounded-md" style={{ 
      backgroundImage: "url('https://scontent.fhyd2-3.fna.fbcdn.net/v/t39.30808-6/369844384_686927220122382_4308257332200027693_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=BPJyszkzQjkQ7kNvgEVa52C&_nc_ht=scontent.fhyd2-3.fna&oh=00_AfCSM94q4ATAsLPuVamBC8qlRQuEAf30_AcisOuajtj1Pw&oe=663D7124')",
      backgroundSize: "55% auto", // Adjust the size as per your requirement
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundColor:"#f5f5f5"
  }}></div>
  <div className="contents order-2 order-md-1" style={{ backgroundColor: "#f5f5f5" }}>
    <Container>
      <Row className="align-items-center justify-content-center">
        <Col md={7}>
          <Form>
            <Form.Group className="mb-3" controlId="mobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Enter mobile number" onChange={(e)=>{ setUserMobileNumber(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Your Password" onChange={(e)=>{ setUserPassword(e.target.value)}}/>
            </Form.Group>

            <div className="d-flex mb-5 align-items-center">
              <Form.Check type="checkbox" label="Remember me" defaultChecked />
              {/* <div className="ml-auto"><a href="#" className="forgot-pass">Forgot Password</a></div> */}
            </div>

            <div className='d-flex '>
              <Button variant="primary" type="submit" className="btn-block" onClick={handleLogin}> Log In  </Button>
              <Link aria-label="register" className="navbar-link" to="/registerUser">
                <span className="nav-link-label">Register new user</span>
              </Link>
            </div>


</Form>

          </Col>
        </Row>
      </Container>
    </div>
  </div>
  )
}

export default Login