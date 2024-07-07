// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = ({ user }) => {
  const { cartItems, clearCart } = useCart();
  const [ticketNumber, setTicketNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    // Fetch user details if user is logged in
    if (user && user.id) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`/api/user/${user.id}`);
          setIdNumber(response.data.idNumber);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };

      fetchUserDetails();
    }
  }, [user]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert('请选择支付方式.');
      return;
    }

    const paymentStatus = paymentMethod === 'online' ? 'PAID' : 'PENDING';

    const orderDetails = {
      userId: user.id,
      idNumber,
      storeId: cartItems[0].storeId, // Assuming all items are from the same store
      storeName: cartItems[0].storeName, // Assuming all items are from the same store
      items: cartItems,
      totalAmount,
      paymentStatus,
    };

    try {
      const response = await axios.post('/api/checkout', orderDetails);
      if (response.status === 200) {
        setTicketNumber(response.data.ticketNumber);
        alert('Order placed successfully');
        clearCart();
        navigate('/confirmation');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="checkout-container">
      <header className="checkout-header">
        <h1>结算</h1>
        <div className="total-amount">总金额: {totalAmount} 元</div>
      </header>
      <div className="checkout-items">
        {cartItems.map((item) => (
          <div key={item.id} className="checkout-item">
            {item.image && <img src={`/images/${item.image}`} alt={item.name} className="checkout-item-image" />}
            <div className="checkout-item-details">
              <h3>{item.name}</h3>
              <p>价格: {item.price} 元</p>
              <p>数量: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="payment-method">
        <label>
          支付方式:
          <select value={paymentMethod} onChange={handlePaymentMethodChange}>
            <option value="">选择支付方式</option>
            <option value="online">在线支付</option>
            <option value="store">在商店支付</option>
          </select>
        </label>
      </div>
      <div className="checkout-actions">
        <button onClick={handleCheckout} className="checkout-button">下订单</button>
      </div>
      {ticketNumber && <div className="ticket-number">单号: {ticketNumber}</div>}
    </div>
  );
};

export default Checkout;
