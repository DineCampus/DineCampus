import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import './FormStyles.css';

const Booking = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [peopleCount, setPeopleCount] = useState('');
  const [bookingType, setBookingType] = useState('table');
  const [room, setRoom] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/booking', {
        name,
        userId,
        eventDetails,
        peopleCount,
        bookingType,
        room: bookingType === 'room' ? room : null,
        bookingTime,
      });
      setTicketNumber(response.data.ticketNumber);
      alert(`Booking placed successfully. Your ticket number is: ${response.data.ticketNumber}`);
    } catch (error) {
      console.error('Error placing booking:', error);
      alert('Failed to place booking');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">包厢预订</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ID号"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="事件详细信息"
          value={eventDetails}
          onChange={(e) => setEventDetails(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="人数"
          value={peopleCount}
          onChange={(e) => setPeopleCount(e.target.value)}
          required
        />
        <select
          value={bookingType}
          onChange={(e) => setBookingType(e.target.value)}
          required
        >
          <option value="table">桌子</option>
          <option value="room">包厢</option>
        </select>
        {bookingType === 'room' && (
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
          >
            <option value="">选择包厢</option>
            <option value="Room A">包厢 A</option>
            <option value="Room B">包厢 B</option>
            <option value="Room C">包厢 C</option>
            <option value="Room D">包厢 D</option>
          </select>
        )}
        <input
          type="datetime-local"
          placeholder="Booking Time"
          value={bookingTime}
          onChange={(e) => setBookingTime(e.target.value)}
          required
        />
        <button type="submit">提交</button>
      </form>
      {ticketNumber && (
        <div className="ticket-number">
          <p>预订成功</p>
          <p>你的单号是： <strong>{ticketNumber}</strong></p>
        </div>
      )}
    </div>
  );
};

export default Booking;
