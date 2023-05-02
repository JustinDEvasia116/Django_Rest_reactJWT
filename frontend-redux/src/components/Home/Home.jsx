import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});
  const authTokens = JSON.parse(localStorage.getItem('authTokens'));

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/', {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });

      console.log('response data:', response.data);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = () => {
    setEditMode(true);
    setEditedUserData({
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
    });
  };

  const onCancel = () => {
    setEditMode(false);
    setEditedUserData({});
  };

  const onSave = async () => {
    try {
      const response = await axios.put(
        'http://127.0.0.1:8000/api/user/update/',
        editedUserData,
        {
          headers: {
            'Content-type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
        }
      );

      console.log('response data:', response.data);
      setUserData(response.data);
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="home-page">
      <div className="profile-container">
        <h1 className="profile-header">Profile</h1>
        <div className="personal-info">
          <h2>Personal Info</h2>
          {userData ? (
            <>
              <div>
                <p>
                  <strong>First Name:</strong>{' '}
                  {editMode ? (
                    <input
                      type="text"
                      name="first_name"
                      value={editedUserData.first_name || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    userData.first_name
                  )}
                </p>
                <p>
                  <strong>Last Name:</strong>{' '}
                  {editMode ? (
                    <input
                      type="text"
                      name="last_name"
                      value={editedUserData.last_name || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    userData.last_name
                  )}
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  {editMode ? (
                    <input
                      type="text"
                      name="email"
                      value={editedUserData.email || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    userData.email
                  )}
                </p>
              </div>
              {editMode ? (
                <>
                  <button onClick={onSave}>Save</button>
                  <button onClick={onCancel}>Cancel</button>
                </>
              ) : (
                <button onClick={onEdit}>Edit</button>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
    
      </div>
    </div>
  );
          }  

export default Home;
