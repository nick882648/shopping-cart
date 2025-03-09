'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface AppContextType {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Cart state
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Component
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // User State
  const [user, setUser] = useState<User | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Cart Functions
  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.size === item.size && 
        cartItem.color === item.color
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <AppContext.Provider 
      value={{ 
        user,
        setUser,
        cart, 
        addToCart, 
        removeFromCart, 
        updateCartItemQuantity 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom Hooks
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Convenience hooks
export function useUser() {
  const { user, setUser } = useApp();
  return { user, setUser };
}

export function useCart() {
  const { cart, addToCart, removeFromCart, updateCartItemQuantity } = useApp();
  return { cart, addToCart, removeFromCart, updateCartItemQuantity };
} 