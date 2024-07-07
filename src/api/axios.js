import axios from 'axios';

// Get the token from localStorage or any other storage mechanism you're using
const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
});

// Optional: Interceptor to refresh token if needed
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      // Handle token refresh logic here
      // For example, you can call a refresh endpoint and update the token in localStorage
      // Then update the token in the axios instance and retry the failed request
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
