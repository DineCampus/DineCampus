// src/components/DeleteStore.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import './FormStyles.css';

const DeleteStore = () => {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState('');

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

  const handleDeleteStore = async (e) => {
    e.preventDefault();
    if (!storeId) {
      alert('Please select a store to delete.');
      return;
    }
    try {
      await axiosInstance.delete(`/stores/${storeId}`);
      alert('Store deleted successfully');
      // Refresh the list of stores after deletion
      setStores(stores.filter(store => store.id !== parseInt(storeId)));
      setStoreId(''); // Reset the selected store ID
    } catch (error) {
      console.error('Error deleting store:', error);
      alert('Failed to delete store');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">删除店</h1>
      <form onSubmit={handleDeleteStore}>
        <select
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
        >
          <option value="">选择店</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
        <button type="submit">删除</button>
      </form>
    </div>
  );
};

export default DeleteStore;
