import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './loginpage.css';

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);

  return (
    <div className='user-login'>
      <form onSubmit={loginUser} className='md-col-6'>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input name='username' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="username" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input name='password' type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;

