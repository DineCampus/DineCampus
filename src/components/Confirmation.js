import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Confirmation.css'; // Import your CSS file for styling

const Confirmation = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <h1>确认</h1>
        {state && state.ticketNumber ? (
          <>
            <p>Your pre-order has been placed successfully!</p>
            <p>单号: <strong>{state.ticketNumber}</strong></p>
          </>
        ) : (
          <p>谢谢！您的订单已成功下单。</p>
        )}
        <Link to="/" className="confirmation-home-link">回到首页</Link>
      </div>
    </div>
  );
};

export default Confirmation;
