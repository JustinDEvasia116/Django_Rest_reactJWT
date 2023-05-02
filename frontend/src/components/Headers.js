import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Headers = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div style={{ marginBottom: '20px' }}>
      <Link to="/">Home</Link>
      <span> | </span>
      <Link to="/admin">Admin</Link> {/* Add a link to the AdminPage */}
      <span> | </span>
      <Link to="/dashboard">Dashboard</Link>
      <span> | </span>
      
      {user ? (
        <Link to="/" onClick={logoutUser}>Logout</Link>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <span> | </span>
          <Link to="/login">Login</Link>
        </>
      )}
      {user && <p>Hello {user.username}</p>}
    </div>
  );
};

export default Headers;

