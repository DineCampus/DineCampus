// src/components/StoreDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import './StoreDetails.css';

function StoreDetails() {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await api.get(`/stores/${storeId}`);
        setStore(response.data);
      } catch (error) {
        console.error('Error fetching store details:', error);
      }
    };

    fetchStoreDetails();
  }, [storeId]);

  if (!store) {
    return <div>Loading store details...</div>;
  }

  return (
    <div className="store-details page-container">
      <h1>{store.name}</h1>
      <img src={store.image_url} alt={store.name} className="store-details-image" />
      <div className="store-details-info">
        <p><strong>地址：</strong>{store.address}</p>
        <p><strong>营业时间：</strong>{store.operating_hours}</p>
        <p>{store.description}</p>
      </div>
    </div>
  );
}

export default StoreDetails;
