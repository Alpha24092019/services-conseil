import { useCartStore } from '@/stores';
import type { Book } from '@/types';

export const useCart = () => {
  const { 
    items, 
    getTotalItems, 
    getTotalPrice, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    isInCart 
  } = useCartStore();

  return {
    items,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice(),
    addToCart: (book: Book, quantity?: number) => addToCart(book, quantity),
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
  };
};
