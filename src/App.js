import React from 'react';
import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;

