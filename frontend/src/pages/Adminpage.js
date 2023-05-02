import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const AdminPage = () => {
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(formData);
  }

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type='text'
          name='username'
          id='username'
          value={formData.username}
          onChange={handleChange}
          placeholder='Enter Username'
        />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Enter Password'
        />
        <br></br>
        <br></br>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default AdminPage;
