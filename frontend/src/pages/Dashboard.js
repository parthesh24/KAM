import React from 'react'
import LoginPage from './login/login';
import { useState, useEffect } from 'react';

export const Dashboard = () => {
  const [token,setToken] = useState('');

  useEffect(() =>{
    const temp = localStorage.getItem('jwt');
    setToken(temp || '');
  },[]);

  const logout = (e) => {
    localStorage.removeItem('jwt');
    setToken('');
    window.location.href = '/';
  }
  
  return (
    <div>
    <h1>Welcome to KAM Manager System</h1>
    <center><h3>Login Here</h3></center>
    {token===''?<LoginPage/>:
    (
      <center>
        <button
          onClick={logout}
          className="nav-button logout-button"
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
        </center>
    )
    }
    </div>
  )
}
