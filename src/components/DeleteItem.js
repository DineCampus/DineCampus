// src/components/DeleteItem.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import './FormStyles.css'; // Import the CSS file

const DeleteItem = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');

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

  useEffect(() => {
    const fetchItems = async () => {
      if (selectedStoreId) {
        try {
          const response = await axiosInstance.get(`/stores/${selectedStoreId}/items`);
          setItems(response.data);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      }
    };
    fetchItems();
  }, [selectedStoreId]);

  const handleDeleteItem = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.delete(`/stores/${selectedStoreId}/items/${selectedItemId}`);
      alert('Item deleted successfully');
      setItems(items.filter(item => item.id !== selectedItemId));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">Delete Item</h1>
      <form onSubmit={handleDeleteItem}>
        <select
          value={selectedStoreId}
          onChange={(e) => setSelectedStoreId(e.target.value)}
        >
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
          ))}
        </select>
        <select
          value={selectedItemId}
          onChange={(e) => setSelectedItemId(e.target.value)}
        >
          <option value="">Select Item</option>
          {items.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
        <button type="submit">Delete Item</button>
      </form>
    </div>
  );
};

export default DeleteItem;
