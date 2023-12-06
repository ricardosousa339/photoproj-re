import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { API_BASE_URL } from '../apiConfig';

const App = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    password2: '',
    email: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const response = await axios.post(`${API_BASE_URL}`+'register/', form);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">Cadastro</label>
          <input type="text" name="username" placeholder="Usuário" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Senha" required onChange={handleChange} />
          <input type="password" name="password2" placeholder="Confirme a senha" required onChange={handleChange} />
          <button type="submit">Cadastro</button>
        </form>
      </div>

      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="text" name="username" placeholder="Usuário" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Senha" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default App;
