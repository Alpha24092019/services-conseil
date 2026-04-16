import axios from 'axios';

// انسخ رابط Render الذي ظهرت فيه رسالة "السيرفر يعمل بنجاح"
const API_URL = "https://services-conseil.onrender.com"; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;