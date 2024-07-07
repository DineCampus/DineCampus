// src/components/StoreItems.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import './StoreItems.css'; // Create and adjust the path as necessary

function StoreItems() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const storeResponse = await api.get(`/stores/${storeId}`);
        setStore(storeResponse.data);

        const itemsResponse = await api.get(`/stores/${storeId}/items`);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error fetching store or items:', error);
      }
    };

    fetchStore();
  }, [storeId]);

  const handleSelectItem = (item) => {
    navigate(`/store/${storeId}/item/${item.id}`);
  };

  if (!store) {
    return <div>Loading store...</div>;
  }

  return (
    <div className="store-items-page">
      <h1>{store.name}</h1>
      <div className="items-container">
        {items.map((item) => (
          <div key={item.id} className="item-card" onClick={() => handleSelectItem(item)}>
            <img src={item.image} alt={item.name} className="item-image" />
            <div className="item-name">{item.name}</div>
            <div className="item-price">{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreItems;
