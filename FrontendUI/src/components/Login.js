// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAsGuest } from '../api/events';

const Login = () => {
  const navigate = useNavigate();
  const handleGuestLogin = async () => {
    try {
        const guestResponse = await loginAsGuest();
        console.log("guestResponse",guestResponse);
        
        if (guestResponse.message === "Guest user created successfully") {
            localStorage.setItem('user', JSON.stringify(guestResponse.user)); // Store guest user data
            navigate('/events'); // Redirect to events page
        } else {
            console.log(guestResponse.message);
        }
    } catch (err) {
        console.log(err.message); // Display error message
    }
};

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGuestLogin}>Login as Guest</button>
    </div>
  );
};

export default Login;
