const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// استيراد النماذج (تأكد من وجود هذه الملفات في مجلد models)
// const Article = require('./models/Article'); 
// const Law = require('./models/Law');
// وغيرهم...

const app = express();

app.use(cors());
app.use(express.json());

// الاتصال بـ MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- المسارات (Routes) ---

// 1. رابط الفحص الرئيسي
app.get('/', (req, res) => {
  res.send('السيرفر يعمل بنجاح! 🇩🇿');
});

// 2. مسار الإحصائيات (Dashboard Stats)
// ملاحظة: أزلنا /api/ من البداية لأن الخدمة تطلب /dashboard/stats مباشرة
app.get('/dashboard/stats', async (req, res) => {
  try {
    const stats = {
      counts: {
        // إذا لم تكن النماذج جاهزة بعد، يمكنك وضع أرقام ثابتة مؤقتاً للتجربة
        totalArticles: 12, 
        totalLaws: 45,
        totalBooks: 8,
        totalOrders: 3,
        totalUsers: 150,
        totalRevenue: 75000 
      },
      recentOrders: [], 
      popularBooks: []  
    };
    res.json({ data: stats }); // تأكد من إرجاع الكائن داخل data كما تتوقع الواجهة
  } catch (error) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

// 3. مسار النشاط الأخير (Activity)
app.get('/dashboard/activity', async (req, res) => {
  try {
    const activities = [
      { type: 'article', title: 'تم إضافة قانون جديد', description: 'قانون المالية 2026', date: new Date() },
      { type: 'order', title: 'طلب جديد', description: 'شراء كتاب القانون المدني', date: new Date() }
    ];
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب النشاطات" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
