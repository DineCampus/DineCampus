import React, { useState } from 'react';
import axios from 'axios';
import './FormStyles.css';

const AccountDetails = ({ user }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    try {
      await axios.put(`/api/users/${user.id}/password`, {
        currentPassword,
        newPassword,
      });
      alert('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">查看账户详情/更新密码</h1>
      <form onSubmit={handlePasswordUpdate}>
        <label>
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm New Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default AccountDetails;
