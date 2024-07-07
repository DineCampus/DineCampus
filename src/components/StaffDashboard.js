import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios'; // Ensure correct path
import './StaffDashboard.css'; // Import the CSS file

const StaffDashboard = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleDeleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
      alert('Failed to delete notification');
    }
  };

  return (
    <div className="staff-dashboard">
      <h1 className="dashboard-title">人员管理</h1>
      <ul className="dashboard-links">
        <li><Link to="/add-store" className="dashboard-link">新建店</Link></li>
        <li><Link to="/update-store" className="dashboard-link">更新店</Link></li>
        <li><Link to="/delete-store" className="dashboard-link">删除店</Link></li>
        <li><Link to="/add-item" className="dashboard-link">加食物</Link></li>
        <li><Link to="/update-item" className="dashboard-link">更新食物</Link></li>
        <li><Link to="/delete-item" className="dashboard-link">删除食物</Link></li>
      </ul>
      <div className="notifications">
        <h2 className="notifications-title">订单</h2>
        {notifications.length === 0 ? (
          <p className="no-notifications">没有新订单</p>
        ) : (
          <ul className="notifications-list">
            {notifications.map((notification) => (
              <li key={notification.id} className="notification-item">
                {notification.type === 'preorder' ? (
                  <p>Preorder: {notification.details}</p>
                ) : (
                  <p>Booking: {notification.details}</p>
                )}
                <button 
                  onClick={() => handleDeleteNotification(notification.id)} 
                  className="delete-button"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
