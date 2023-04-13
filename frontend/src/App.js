import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import Headers from './components/Headers';
import PrivateRoute from './utils/PrivateRoute'; // Import the PrivateRoute component
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Headers />
          <Routes>
            {/* Update Route component's path prop to "*" */}
            <Route
              path="*"
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
              element={<Loginpage setAuthenticated={setAuthenticated} />}
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
