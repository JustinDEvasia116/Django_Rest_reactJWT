import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({element, ...rest}) => {
    let {user} = useContext(AuthContext)
    return user?(
      <Routes>
      <Route path="/" element={element} />
         </Routes>       
    ):(
      <Navigate to="/login" replace />

    );
}

export default PrivateRoute;