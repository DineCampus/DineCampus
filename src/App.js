import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import StorePage from './components/StorePage';
import StoreDetails from './components/StoreDetails';
import ItemPage from './components/ItemPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AccountDetails from './components/AccountDetails';
import OrderHistory from './components/OrderHistory';
import Feedback from './components/Feedback';
import StudentDashboard from './components/StudentDashboard';
import StaffDashboard from './components/StaffDashboard';
import AddStore from './components/AddStore';
import UpdateStore from './components/UpdateStore';
import DeleteStore from './components/DeleteStore';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem';
import DeleteItem from './components/DeleteItem';
import Preorder from './components/Preorder';
import Booking from './components/booking';
import Checkout from './components/Checkout';
import Confirmation from './components/Confirmation';
import Cart from './components/Cart';
import {jwtDecode} from 'jwt-decode';

function App() {
  const [user, setUser] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }

    const timer = setTimeout(() => {
      const splashScreen = document.querySelector('.Splash-screen');
      if (splashScreen) {
        splashScreen.style.animation = 'fadeOut 2s';
      }
      setTimeout(() => setShowSplash(false), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <div className="App">
      {showSplash ? (
        <div className="Splash-screen">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" className="App-logo" />
          <p>
            欢迎来到美味食堂! 开始探索吧，享受美味，尽在指尖！
          </p>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<MainPage user={user} onLogout={handleLogout} />} />
          <Route path="/account" element={<StudentDashboard user={user} />} />
          <Route path="/account/details" element={<AccountDetails user={user} />} />
          <Route path="/account/order-history" element={<OrderHistory user={user} />} />
          <Route path="/account/feedback" element={<Feedback user={user} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/store/:storeId" element={<StorePage />} />
          <Route path="/store/:storeId/details" element={<StoreDetails />} />
          <Route path="/store/:storeId/item/:itemId" element={<ItemPage />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/add-store" element={<AddStore />} />
          <Route path="/update-store" element={<UpdateStore />} />
          <Route path="/delete-store" element={<DeleteStore />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/update-item" element={<UpdateItem />} />
          <Route path="/delete-item" element={<DeleteItem />} />
          <Route path="/preorder" element={<Preorder user={user} />} />
          <Route path="/booking" element={<Booking user={user} />} />
          <Route path="/checkout" element={<Checkout user={user} />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/store/:storeId/cart" element={<Cart />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
