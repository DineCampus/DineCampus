// src/components/OrderHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = ({ user }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`/api/orders/history/${user.id}`);
        setOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  const handleSubmitFeedback = async (orderId) => {
    try {
      await axios.post('/api/feedback', { userId: user.id, orderId, rating, comments: feedback });
      alert('反馈提交成功');
      setFeedback('');
      setRating(5);
      setSelectedOrderId(null);
    } catch (error) {
      console.error('提交反馈时出错:', error);
      alert('提交反馈失败');
    }
  };

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orderHistory.map(order => (
            <li key={order.id}>
              <p>Order Date: {new Date(order.created_at).toLocaleString()}</p>
              <p>Store: {order.store_name}</p>
              <p>Item: {order.item_name || 'N/A'}</p>
              <p>Quantity: {order.quantity || 'N/A'}</p>
              <p>Total Amount: {order.total_amount !== null ? `${order.total_amount} 元` : 'N/A'}</p>
              <p>Payment Method: {order.payment_method || 'N/A'}</p>
              <p>Type: {order.type}</p>
              <button onClick={() => setSelectedOrderId(order.id)}>
                {selectedOrderId === order.id ? 'Hide Feedback' : 'Give Feedback'}
              </button>
              {selectedOrderId === order.id && (
                <div className="feedback-form">
                  <label>
                    Rating:
                    <select value={rating} onChange={(e) => setRating(e.target.value)}>
                      {[1, 2, 3, 4, 5].map(score => (
                        <option key={score} value={score}>{score}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Comments:
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required />
                  </label>
                  <button onClick={() => handleSubmitFeedback(order.id)}>Submit Feedback</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
