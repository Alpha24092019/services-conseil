# Algerian Legal Blog - Backend API

Backend API for Algerian Legal Blog - A comprehensive legal platform featuring articles, laws library, and book store.

## Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Articles Management**: CRUD operations for legal articles
- **Laws Library**: Upload and download Algerian laws in PDF format
- **Book Store**: E-commerce functionality for legal books
- **Order Management**: Cash on delivery orders with Google Sheets integration
- **Admin Dashboard**: Comprehensive statistics and analytics
- **Categories**: Organized content by categories

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Google Sheets API integration

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd legal-blog-backend
```

2. Install dependencies
```bash
npm install
```

3. Create .env file
```bash
cp .env.example .env
```

4. Update environment variables in .env file

5. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
GOOGLE_SHEETS_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Articles
- `GET /api/articles` - Get all articles
- `GET /api/articles/:slug` - Get single article
- `POST /api/articles` - Create article (Admin)
- `PUT /api/articles/:id` - Update article (Admin)
- `DELETE /api/articles/:id` - Delete article (Admin)

### Laws
- `GET /api/laws` - Get all laws
- `GET /api/laws/:slug` - Get single law
- `POST /api/laws` - Create law (Admin)
- `PUT /api/laws/:id` - Update law (Admin)
- `DELETE /api/laws/:id` - Delete law (Admin)
- `GET /api/laws/:id/download` - Download law PDF

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:slug` - Get single book
- `POST /api/books` - Create book (Admin)
- `PUT /api/books/:id` - Update book (Admin)
- `DELETE /api/books/:id` - Delete book (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get single order (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `GET /api/orders/track/:orderNumber` - Track order

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics (Admin)
- `GET /api/dashboard/activity` - Get recent activity (Admin)

## Google Sheets Setup

1. Create a Google Cloud Project
2. Enable Google Sheets API
3. Create a Service Account
4. Download the JSON key file
5. Share your Google Sheet with the service account email
6. Add the credentials to your .env file

## Deployment

### Deploy to Render/Railway/Heroku

1. Push code to GitHub
2. Connect your repository to the platform
3. Add environment variables
4. Deploy

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your IP to the whitelist
4. Create a database user
5. Get the connection string
6. Add it to your environment variables

## License

MIT
