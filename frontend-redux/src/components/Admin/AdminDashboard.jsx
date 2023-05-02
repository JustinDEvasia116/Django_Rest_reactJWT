import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './AdminDashboard.css'
import { FaBan, FaCheck, FaTrash } from 'react-icons/fa';
// import { adminLogout } from '../../features/auth/authSlice';

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user ? user.is_admin : null;
  const [statusChange, setStatusChange] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );



  useEffect(() => {
    if (isAdmin === null) {
      // Redirect to login if user is not logged in or isAdmin is not present in local storage
      navigate('/admin');
    } else {
      // Fetch list of users from API
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/admins/dashboard/');
          setUsers(response.data);
        } catch (error) {
          console.error('Error:', error);
          alert('Failed to fetch users. Please try again.');
        }
      };
      fetchUsers();
    }
  }, [isAdmin, navigate, statusChange]);
  

  const handleBlockUser = async (id, is_active) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/admins/dashboard/block-unblock/', { user_id: id });
      alert(response.data.message);
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          const updatedUser = { ...user, is_active: !is_active };
          return updatedUser;
        }
        return user;
      });
      setUsers(updatedUsers);
      setStatusChange(!statusChange);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to block/unblock user. Please try again.');
    }
  };


  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/admins/dashboard/delete-user/${id}/`);
      alert('User deleted successfully!');
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
     <div className="search-container">
      <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    </div>
      <h1>User Details</h1>
      <br />
      <br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.is_active ? 'Active' : 'Inactive'}</td>
              <td style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  className="block-button"
                  onClick={() => handleBlockUser(user.id, !user.is_active)}
                >
                  {user.is_active ? 'Block' : 'Unblock'}
                </button>

                <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>
                  <FaTrash /> </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};


export default AdminDashboard;