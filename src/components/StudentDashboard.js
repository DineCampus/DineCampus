// src/components/StudentDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css';

function StudentDashboard({ user }) {
  if (!user) {
    return <div>请登录以访问用户帐户。</div>;
  }

  return (
    <div className="student-dashboard">
      <h1>学生仪表板 - 欢迎, {user.name}</h1>
      <div className="dashboard-links">
        <Link to="/account/details">账户详情</Link>
        <Link to="/account/order-history">订单历史</Link>
        <Link to="/account/feedback">反馈和评分</Link>
      </div>
    </div>
  );
}

export default StudentDashboard;
