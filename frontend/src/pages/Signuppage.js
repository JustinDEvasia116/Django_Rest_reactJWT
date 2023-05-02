import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signuppage.css';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [signupMessage, setSignupMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const Navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        username
      });
      console.log(response.data);
      setSignupMessage('Signup successful!');
      setTimeout(() => {
        Navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response) {
        // If server responds with a bad request (4xx) or server error (5xx)
        setErrorMessage(`Signup failed. ${error.response.data.detail}`); // Set error message from server response
      } else if (error.request) {
        // If request was made but no response was received
        setErrorMessage('Signup failed. Please check your internet connection and try again.');
      } else {
        // If error occurred during request setup
        setErrorMessage('Signup failed. Please try again later.');
      }
    }
  };

  return (
    <div className="signup-container">
      <p className="signup-message">{signupMessage}</p>
      <p className="error-message">{errorMessage}</p>
      <h1>Signup Page</h1>
      <form onSubmit={handleSignup} className="signup-form">
      <div className="form-group">
          <label htmlFor="email" className="label-text">Email:</label>
          <input type="email" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="label-text">Password:</label>
          <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="label-text">First Name:</label>
          <input type="text" id="firstName" placeholder="Enter First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="label-text">Last Name:</label>
          <input type="text" id="lastName" placeholder="Enter Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="label-text">Username:</label>
          <input type="text" id="username" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <button type="submit" className="signup-btn">Sign up</button>
      </form>
    </div>
  );
};

export default SignupPage;
