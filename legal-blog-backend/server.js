const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// رابط فحص السيرفر
app.get('/', (req, res) => {
  res.send('مرحباً بك في سيرفر المدونة القانونية الجزائرية - السيرفر يعمل بنجاح! 🇩🇿');
});

// الاتصال بـ MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ تم الاتصال بقاعدة البيانات بنجاح'))
  .catch(err => console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على المنفذ ${PORT}`);
});