import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OnlineMode = () => {
    const navigation = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      password: '',
    });

    useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        navigation('/');
      }
    }, [navigation]);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post('https://zerkobackend.onrender.com/register', formData);
        console.log(response.data);
        
        const offlineData = JSON.parse(localStorage.getItem('offlineData') || '[]');
        localStorage.setItem('offlineData', JSON.stringify([...offlineData, formData]));
        alert('Registration successful');
        navigation('/');
      }  catch (error) {
        if(error.response.status === 400) {
          alert('email or phone number already registered');
        }
       
        console.error('Registration failed:', error.response ? error.response.data : error.message);
        alert('Registration failed');
      }
    };

    return (
      <>
        <h2>User Registration Form</h2>
        <div className='login'>
          <form className="container" onSubmit={handleSubmit}>
            <h2>Online SignUp</h2>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Phone:
              <input type="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </label>
            <button type="submit">Register</button>
            <p>If you have an account? <a href="/">Login here</a>.</p>
          </form>
        </div>
      </>
    );
};

export default OnlineMode;
