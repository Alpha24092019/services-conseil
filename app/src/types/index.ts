// User Types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  phone?: string;
  address?: string;
  city?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
}

// Category Types
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  type: 'article' | 'law' | 'book';
  parent?: string | null;
  order: number;
  isActive: boolean;
}

// Article Types
export interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  category: Category;
  tags: string[];
  author: User;
  views: number;
  likes: string[];
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
}

// Law Types
export interface Law {
  _id: string;
  title: string;
  number: string;
  year: number;
  slug: string;
  description: string;
  content?: string;
  category: Category;
  pdfFile: string;
  pdfSize: number;
  pages: number;
  downloadCount: number;
  publishedInOfficialGazette: boolean;
  gazetteNumber?: string;
  gazetteDate?: string;
  isActive: boolean;
  publishedAt: string;
}

// Book Types
export interface Book {
  _id: string;
  title: string;
  slug: string;
  author: string;
  description: string;
  coverImage?: string;
  category: Category;
  price: number;
  oldPrice: number;
  stock: number;
  isAvailable: boolean;
  isbn?: string;
  publisher?: string;
  pages: number;
  language: string;
  year: number;
  featured: boolean;
  views: number;
  salesCount: number;
  rating: number;
  reviewsCount: number;
  isActive: boolean;
  createdAt: string;
}

// Order Types
export interface OrderItem {
  book: Book;
  quantity: number;
  price: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  wilaya: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  deliveryFee: number;
  discount: number;
  finalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cash_on_delivery' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed';
  notes?: string;
  googleSheetsSynced: boolean;
  deliveredAt?: string;
  createdAt: string;
}

export interface CreateOrderData {
  customer: Customer;
  items: { bookId: string; quantity: number }[];
  deliveryFee?: number;
  discount?: number;
  notes?: string;
}

// Cart Types
export interface CartItem {
  book: Book;
  quantity: number;
}

// Dashboard Types
export interface DashboardStats {
  counts: {
    totalArticles: number;
    publishedArticles: number;
    totalLaws: number;
    activeLaws: number;
    totalBooks: number;
    activeBooks: number;
    totalOrders: number;
    pendingOrders: number;
    totalUsers: number;
    totalRevenue: number;
  };
  recentOrders: Order[];
  monthlyOrders: {
    _id: { year: number; month: number };
    count: number;
    revenue: number;
  }[];
  popularBooks: Book[];
  recentArticles: Article[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

// Pagination Params
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}
