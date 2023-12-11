import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProfilePage from '../Profile/Profile';
import Cookies from 'js-cookie';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('access_token'));

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!Cookies.get('access_token'));
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
