import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5118/api', // Double check your backend port!
  withCredentials: true, // MUST be true for your backend cookies to work
});

export default api;
