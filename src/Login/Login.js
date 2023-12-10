import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ProfilePage from '../Profile/Profile';
import Cookies from 'js-cookie';

const App = () => {
  const access_token = Cookies.get('access_token');
  if(!access_token){
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

export default App;
