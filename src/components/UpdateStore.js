// src/components/UpdateStore.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import './FormStyles.css'; // Import the CSS file

const UpdateStore = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axiosInstance.get('/stores');
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };
    fetchStores();
  }, []);

  const handleUpdateStore = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/stores/${selectedStoreId}`, { name, icon });
      alert('Store updated successfully');
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update store');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">Update Store</h1>
      <form onSubmit={handleUpdateStore}>
        <select
          value={selectedStoreId}
          onChange={(e) => setSelectedStoreId(e.target.value)}
        >
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
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
        <button type="submit">Update Store</button>
      </form>
    </div>
  );
};

export default UpdateStore;
