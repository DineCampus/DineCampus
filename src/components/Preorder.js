import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import './FormStyles.css'; // Importing the same CSS as for booking

const Preorder = () => {
  const [pickupTime, setPickupTime] = useState('');
  const [storeName, setStoreName] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [idNumber, setIdNumber] = useState(''); // Initialize with empty string
  const { cartItems } = useCart(); // Use the useCart hook to get cart items
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length > 0) {
      setStoreName(cartItems[0].storeName); // Assuming all items in the cart are from the same store
    }
  }, [cartItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preorderDetails = {
      idNumber: idNumber, // Ensure idNumber is included
      storeId: cartItems[0].storeId, // Assuming all items in the cart are from the same store
      items: cartItems,
      pickupTime: pickupTime,
    };

    try {
      const response = await axios.post(`/api/stores/${cartItems[0].storeId}/preorder`, preorderDetails);
      if (response.status === 200) {
        setTicketNumber(response.data.ticketNumber);
        alert('Pre-order placed successfully');
        navigate('/confirmation'); // Redirect to a confirmation page
      }
    } catch (error) {
      console.error('Error placing preorder:', error);
      alert('Failed to place pre-order');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">食堂预订</h1>
      {ticketNumber && <div className="ticket-number">单号: {ticketNumber}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          ID 号:
          <input 
            type="text" 
            value={idNumber} 
            onChange={(e) => setIdNumber(e.target.value)} // Allow manual input
            required
          />
        </label>
        <label>
          商店名:
          <input type="text" value={storeName} readOnly />
        </label>
        <label>
          取餐时间:
          <input type="time" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} required />
        </label>
        <button type="submit">提交</button>
      </form>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <p>{item.name}</p>
            <p>{item.quantity} x {item.price} 元</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preorder;
