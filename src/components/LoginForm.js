import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { jwtDecode } from 'jwt-decode'; // Ensure you have jwt-decode installed

function LoginForm({ setUser }) {
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/login', { idNumber, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store the token in localStorage
      const decodedUser = jwtDecode(token); // Decode the token
      setUser(decodedUser); // Update the user state
      navigate('/'); // Redirect to the main page
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ID 号:</label>
        <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
      </div>
      <div>
        <label>密码:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">登录</button>
    </form>
  );
}

export default LoginForm;
