import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  
  // Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
  
  // Actions
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.book.price * item.quantity, 0);
      },

      addToCart: (book: Book, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.book._id === book._id);
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.book._id === book._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { book, quantity }],
          };
        });
      },

      removeFromCart: (bookId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.book._id !== bookId),
        }));
      },

      updateQuantity: (bookId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(bookId);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.book._id === bookId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      isInCart: (bookId: string) => {
        return get().items.some((item) => item.book._id === bookId);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
