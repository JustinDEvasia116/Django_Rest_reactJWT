import React, { useState } from 'react';
import { BrowserRouter as Router, Route,Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Dashboard from './pages/Dashboard';
import AdminPage from './pages/Adminpage';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Headers from './components/Headers';
import PrivateRoute from './utils/PrivateRoute'; // Import the PrivateRoute component
import './App.css';
import SignupPage from './pages/Signuppage';

function App() {
  

  return (
    <div className="App">
    
    <Router>
        <AuthProvider>
          
          <Headers/>
          <Routes>
  {/* Update Route component's path prop to "*" */}
  <Route exact
    path="/"
    element={
      (
        <PrivateRoute
          element={<Homepage />}
        />
      )
    }
  />
  <Route
    path="/login" 
    element={<Loginpage />}
  />
  {/* Add a new Route for the AdminPage component */}
  <Route
    path="/admin"
    element={<AdminPage />} // Render the AdminPage component for /admin URL
  />
  <Route
    path="/Signup"
    element={<SignupPage />} // Render the AdminPage component for /admin URL
  />
  <Route
    path="/dashboard"
    element={
      (
        <PrivateRoute
          element={<Dashboard />}
        />
      )
    } 
  />



</Routes>
        </AuthProvider>
      </Router>

    </div>
        
 
  );
}

export default App;
