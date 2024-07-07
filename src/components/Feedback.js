// src/components/Feedback.js
import React, { useState } from 'react';
import axios from 'axios';
import './FormStyles.css';

const Feedback = ({ user }) => {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/feedback', { userId: user.id, rating, comments });
      alert('Feedback submitted successfully');
      setRating(5);
      setComments('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    }
  };

  return (
    <div className="container">
      <h1 className="form-title">反馈和评分</h1>
      <form onSubmit={handleSubmitFeedback}>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map(score => (
              <option key={score} value={score}>{score}</option>
            ))}
          </select>
        </label>
        <label>
          Comments:
          <textarea value={comments} onChange={(e) => setComments(e.target.value)} required />
        </label>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
