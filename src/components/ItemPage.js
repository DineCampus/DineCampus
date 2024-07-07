import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import './ItemPage.css';

function ItemPage() {
  const { storeId, itemId } = useParams();
  const [item, setItem] = useState(null);
console.log(item);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/stores/${storeId}/items/${itemId}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [storeId, itemId]);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="item-page">
      <img src={`/images/${item.image}`} alt={item.name} className="item-image" />
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>{item.weight}</p>
      <p>{item.price}</p>
      <h2>健康指导</h2>
      <p>{item.nutritional_info}</p>
      <p>{item.health_tips}</p>
    </div>
  );
}

export default ItemPage;
