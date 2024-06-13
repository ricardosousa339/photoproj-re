import React from 'react';

import HomePage from './HomePage/HomePage';
import Login from './Login/Login';
import Gallery from './Gallery/Gallery'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/gallery/" element={<Gallery/>} />
      </Routes>
    </Router>
  );
}

export default App;

