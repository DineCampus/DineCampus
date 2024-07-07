// src/components/UpdateItem.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import './FormStyles.css'; // Import the CSS file

const UpdateItem = () => {
  const [stores, setStores] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

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

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/stores/${selectedStoreId}/items/${selectedItemId}`, { name, description, price, image });
      alert('Item updated successfully');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">Update Item</h1>
      <form onSubmit={handleUpdateItem}>
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
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;
