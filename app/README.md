# Algerian Legal Blog - Frontend

Frontend application for Algerian Legal Blog - A comprehensive legal platform featuring articles, laws library, and book store.

## Features

- **Modern UI**: Built with React, TypeScript, Tailwind CSS, and shadcn/ui
- **Responsive Design**: Fully responsive for all devices
- **Authentication**: JWT-based authentication
- **Articles**: Browse and read legal articles
- **Laws Library**: Browse and download Algerian laws in PDF format
- **Book Store**: E-commerce functionality with cash on delivery
- **Cart System**: Add books to cart and checkout
- **Admin Dashboard**: Manage content, orders, and users

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Query (TanStack Query)
- Zustand (State Management)
- React Router DOM
- Axios

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd app
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

5. Start the development server
```bash
npm run dev
```

## Environment Variables

```env
VITE_API_URL=http://localhost:5000/api
```

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

## Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables
6. Deploy

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set framework preset to Vite
4. Add environment variables
5. Deploy

## Project Structure

```
src/
├── components/
│   ├── layout/        # Layout components (Header, Footer, etc.)
│   ├── common/        # Common components (Loading, Error, etc.)
│   └── ui/            # shadcn/ui components
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── services/          # API services
├── stores/            # Zustand stores
├── types/             # TypeScript types
├── utils/             # Utility functions
└── App.tsx            # Main app component
```

## License

MIT
