import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsGuest } from '../api/events';
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    try {
        const guestResponse = await loginAsGuest();
        console.log("guestResponse", guestResponse);

        if (guestResponse.message === "Guest user created successfully") {
            localStorage.setItem('user', JSON.stringify(guestResponse.user)); 
            navigate('/events');
        } else {
            console.log(guestResponse.message);
        }
    } catch (err) {
        console.log(err.message); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <button onClick={handleGuestLogin}>Login as Guest</button>
      </div>
    </div>
  );
};

export default Login;
