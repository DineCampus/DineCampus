// src/components/MainPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import './MainPage.css';

function MainPage({ user, onLogout }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/stores');
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  const handleSelectStore = (store) => {
    navigate(`/store/${store.id}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-page">
      <header className="header">
        <div className="logo-heading-container">
          <img src="/images/logo.png" alt="DineCampus Logo" className="logo" />
          <h1 className="heading">好好吃饭！</h1>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a store..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
        <div className="auth-buttons">
          {user ? (
            <>
              {user.role === 'staff' && (
                <button className="auth-button" onClick={() => navigate('/staff-dashboard')}>人员管理</button>
              )}
              {user.role === 'student' && (
                <>
                  <button className="auth-button" onClick={() => navigate('/account')}>账户</button>
                  <div className="dropdown">
                    <button className="dropbtn">选择</button>
                    <div className="dropdown-content">
                      <Link to="/preorder">食堂预订</Link>
                      <Link to="/booking">包厢预订</Link>
                    </div>
                  </div>
                </>
              )}
              <button className="auth-button" onClick={onLogout}>退出</button>
            </>
          ) : (
            <>
              <button className="auth-button" onClick={() => navigate('/login')}>登录</button>
              <button className="auth-button" onClick={() => navigate('/register')}>注册</button>
            </>
          )}
        </div>
      </header>
      <div className="stores-container">
        {filteredStores.map((store) => (
          <div key={store.id} className="store-item" onClick={() => handleSelectStore(store)}>
            <img src={`/images/${store.icon}`} alt={`Store ${store.id}`} className="store-icon" />
            <div className="store-name">{store.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
