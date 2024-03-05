import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


const Dashboard = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigate();
  const [topPlayers, setTopPlayers] = useState([]);

  const handleLogout = async () => {
    if (localStorage.getItem('authToken') !== null) {
      try {
        const response = await fetch('https://zerkobackend.onrender.com/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          localStorage.removeItem('authToken');
          localStorage.clear();
          console.log('Successfully logged out');
          navigation('/');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    }
  };

  useEffect(() => {
    const checkToken = () => {
      let homeCheck = window.location.href.split("/");
      if (localStorage.getItem('authToken') === null && homeCheck[3] === "dashboard") {
        navigation('/');
      } else if (localStorage.getItem("authToken")) {
        const decodedToken = jwtDecode(localStorage.getItem("authToken"));
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expirationTime) {
          console.log('Token has expired');
          localStorage.removeItem('authToken');
          navigation('/');
        } else {
          setToken(localStorage.getItem("authToken"));
        }
      }
    };

    checkToken();
  }, [navigation]);


  return (
    <div className="container" >
      <h1>Welcome to DashBoard</h1>
      <div className='token' >
        <span> Token :<p >{token}</p></span>
      
      </div>
      
      <button onClick={handleLogout}>Logout</button>
      
     
    </div>
  );
};

export default Dashboard;
