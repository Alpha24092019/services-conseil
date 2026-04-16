<<<<<<< HEAD
# المدونة القانونية الجزائرية 🇩🇿

منصة شاملة للقوانين الجزائرية، المقالات القانونية، ومتجر الكتب. مشروع مفتوح المصدر يهدف إلى توفير مصدر موثوق للمعلومات القانونية في الجزائر.

## ✨ المميزات

### 📰 المدونة القانونية
- نشر وقراءة المقالات القانونية
- تصنيف المقالات حسب المواضيع
- البحث في المقالات
- مشاركة المقالات

### 📚 المكتبة القانونية
- تصفح القوانين الجزائرية
- تحميل القوانين بصيغة PDF
- تصفية حسب السنة والتصنيف
- البحث في القوانين

### 🛒 متجر الكتب
- عرض الكتب القانونية
- سلة تسوق كاملة
- الدفع عند الاستلام
- تتبع الطلبات
- ربط مع Google Sheets

### ⚙️ لوحة التحكم الإدارية
- إدارة المقالات (إضافة، تعديل، حذف)
- إدارة القوانين ورفع ملفات PDF
- إدارة الكتب والمنتجات
- إدارة الطلبات وتحديث الحالات
- إحصائيات وتحليلات

## 🛠️ التقنيات المستخدمة

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Query
- Zustand

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (رفع الملفات)
- Google Sheets API

## 🚀 التثبيت والتشغيل

### المتطلبات
- Node.js 18+
- MongoDB
- حساب Google Cloud (لـ Google Sheets)

### 1. استنساخ المشروع
```bash
git clone https://github.com/yourusername/algerian-legal-blog.git
cd algerian-legal-blog
```

### 2. إعداد الـ Backend
```bash
cd legal-blog-backend
npm install
```

إنشاء ملف `.env`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
GOOGLE_SHEETS_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
FRONTEND_URL=http://localhost:5173
```

تشغيل الـ Backend:
```bash
npm run dev
```

### 3. إعداد الـ Frontend
```bash
cd ../app
npm install
```

إنشاء ملف `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

تشغيل الـ Frontend:
```bash
npm run dev
```

## 📁 هيكل المشروع

```
algerian-legal-blog/
├── app/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # المكونات
│   │   ├── pages/          # الصفحات
│   │   ├── hooks/          # React Hooks
│   │   ├── services/       # خدمات API
│   │   ├── stores/         # Zustand Stores
│   │   └── utils/          # دوال مساعدة
│   └── public/
│
├── legal-blog-backend/     # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/    # Controllers
│   │   ├── models/         # Mongoose Models
│   │   ├── routes/         # Routes
│   │   ├── middleware/     # Middleware
│   │   └── utils/          # Utilities
│   └── uploads/            # مجلد رفع الملفات
│
└── README.md
```

## 🌐 النشر

### Netlify (Frontend)
1. اربط repository بـ Netlify
2. اضبط إعدادات البناء:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. أضف متغيرات البيئة
4. انشر!

### Render/Railway (Backend)
1. اربط repository
2. أضف متغيرات البيئة
3. انشر!

## ⚙️ إعداد Google Sheets

1. أنشئ مشروع في Google Cloud Console
2. فعّل Google Sheets API
3. أنشئ Service Account
4. حمّل ملف المفاتيح
5. شارك الـ Spreadsheet مع Service Account Email

## 🤝 المساهمة

نرحب بمساهماتكم! يمكنكم:
- الإبلاغ عن الأخطاء
- اقتراح ميزات جديدة
- إرسال pull requests

## 📄 الترخيص

هذا المشروع مرخص بموجب [MIT License](LICENSE)

## 📞 التواصل

- البريد الإلكتروني: contact@legalblog.dz
- فيسبوك: [@legalblogdz](https://facebook.com/legalblogdz)
- تويتر: [@legalblogdz](https://twitter.com/legalblogdz)

---

<div align="center">
  <p>صنع ب❤️ في الجزائر</p>
  <p>🇩🇿</p>
</div>
=======
# اسم المشروع (موقعي الشخصي الأول)

وصف قصير للمشروع: هذا المشروع عبارة عن صفحة تعريفية بسيطة قمت ببنائها لتعلم أساسيات الـ HTML و CSS.

## 🚀 المميزات
* تصميم متجاوب مع الهواتف.
* واجهة بسيطة وسهلة الاستخدام.
* يحتوي على روابط التواصل الاجتماعي الخاصة بي.

## 🛠 التكنولوجيات المستخدمة
* HTML5
* CSS3
* GitHub Pages (للاستضافة)

## 📸 صورة من المشروع
![وصف الصورة](رابط_صورة_المشروع_هنا)

## 📝 كيف يمكنك تشغيل المشروع؟
1. قم بتحميل المشروع (Download ZIP).
2. افتح ملف `index.html` في متصفحك.

>>>>>>> 67117400e0391f4014286ce629dcfc6566de1a9b
