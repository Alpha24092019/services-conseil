import axios from 'axios';

// استخدم الرابط الذي حصلت عليه من Render لـ Backend
const BASE_URL = "https://services-conseil.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;