import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/NavBar';
import Home from './layouts/Home';
import Login from './layouts/Login';
import Register from './layouts/Register';
import ViewList from './layouts/ViewList';
import Update from './layouts/Update';
import './App.css'
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/view-list" element={<ViewList />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
