import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OfflineMode = () => {
    const navigation = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    useEffect(() => {
    
        const offlineData = JSON.parse(localStorage.getItem('offlineData') || '[]');
        if (offlineData.length > 0 && navigator.onLine) {
            offlineData.forEach(async (data) => {
                try {
                    const response = await axios.post('http://localhost:5590/register', data);
                    console.log(response.data);
                } catch (error) {
                    console.error('Error adding offline data to the database:', error.message);
                }
            });
            localStorage.removeItem('offlineData');
        }
    }, [navigation]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const offlineData = JSON.parse(localStorage.getItem('offlineData') || '[]');
            localStorage.setItem('offlineData', JSON.stringify([...offlineData, formData]));

            alert('Registration successful');
            navigation('/');
        } catch (error) {
            console.error('Registration failed:', error.message);
        }
    };

    return (
        <>
            <h2>User Registration Form</h2>
            <div className='login offline-mode'>
                <form className="container" onSubmit={handleSubmit}>
                    <h2>Offline SignUp</h2>
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
                    <button type="submit">Sign Up (Offline)</button>
                   
                </form>
            </div>
        </>
    );
};

export default OfflineMode;

