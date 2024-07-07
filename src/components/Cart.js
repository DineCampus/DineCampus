import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const getTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!cartItems) {
    return <div>加载...</div>;
  }

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>购物车</h1>
        <div className="cart-actions">
          <Link to="/preorder" className="cart-action-button">食堂预订</Link>
          <Link to="/checkout" className="cart-action-button">去结算</Link>
        </div>
        <div className="cart-total">
          <h3>总计价格: {getTotalCost()} 元</h3>
        </div>
      </header>
      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p>购物车没有货.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                {item.image && <img src={`/images/${item.image}`} alt={item.name} className="cart-item-image" />}
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>价格: {item.price} 元</p>
                  <p>数量: {item.quantity}</p>
                  <button onClick={() => removeFromCart(item.id)} className="remove-from-cart-button">移除</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
