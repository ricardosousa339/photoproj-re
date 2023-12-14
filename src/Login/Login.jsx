import React, { useState, useEffect } from 'react';
import './Login.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProfilePage from '../Profile/Profile';
import { getAccessToken, logout } from '../auth';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!getAccessToken());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if(!isLoggedIn){
    return (
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <RegisterForm />
        <LoginForm />
      </div>
    );
  }
  else{
    return(
      <ProfilePage/>
    )
  }
};

export default Login;
