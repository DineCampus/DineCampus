// src/components/AddItem.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import './FormStyles.css'; // Import the CSS file

const AddItem = () => {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState('');
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

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/stores/${storeId}/items`, { name, description, price, image });
      alert('Item added successfully');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">Add Item</h1>
      <form onSubmit={handleAddItem}>
        <select
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
        >
          <option value="">Select Store</option>
          {stores.map(store => (
            <option key={store.id} value={store.id}>{store.name}</option>
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
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;
