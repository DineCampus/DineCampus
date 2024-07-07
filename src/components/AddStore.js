// src/components/AddStore.js
import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import './FormStyles.css'; // Import the CSS file

const AddStore = () => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/stores', { name, icon });
      alert('Store added successfully');
    } catch (error) {
      console.error('Error adding store:', error);
      alert('Failed to add store');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">Add Store</h1>
      <form onSubmit={handleAddStore}>
        <input
          type="text"
          placeholder="Store Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Icon URL"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
};

export default AddStore;
