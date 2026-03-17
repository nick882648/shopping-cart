'use client';

import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

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
  removeFromCart: (itemKey: string) => void;
  updateCartItemQuantity: (itemKey: string, quantity: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Component
interface ProvidersProps {
  children: ReactNode;
}

const STORAGE_USER_KEY = 'kavya_current_user';
const STORAGE_CART_KEY = 'kavya_cart';

function safeParseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function cartItemKey(item: Pick<CartItem, 'id' | 'size' | 'color'>) {
  return `${item.id}::${item.size ?? ''}::${item.color ?? ''}`;
}

export function Providers({ children }: ProvidersProps) {
  // User State
  const [user, setUser] = useState<User | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Restore persisted state (client-only)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    (async () => {
      try {
        const res = await fetch('/api/auth/me', { method: 'GET' });
        const data = (await res.json().catch(() => null)) as
          | { user: User | null }
          | null;
        if (data?.user && data.user.id && data.user.email && data.user.name) {
          setUser(data.user);
          return;
        }
      } catch {
        // ignore and fall back to local storage
      }

      const storedUser = safeParseJson<User>(window.localStorage.getItem(STORAGE_USER_KEY));
      if (storedUser && storedUser.id && storedUser.email && storedUser.name) {
        setUser(storedUser);
      }
    })();

    const storedCart = safeParseJson<CartItem[]>(window.localStorage.getItem(STORAGE_CART_KEY));
    if (Array.isArray(storedCart)) {
      setCart(
        storedCart.filter(
          (i) =>
            i &&
            typeof i.id === 'string' &&
            typeof i.name === 'string' &&
            typeof i.price === 'number' &&
            typeof i.image === 'string' &&
            typeof i.quantity === 'number'
        )
      );
    }
  }, []);

  // Persist state (client-only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (user) window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      else window.localStorage.removeItem(STORAGE_USER_KEY);
    } catch {
      // ignore storage errors
    }
  }, [user]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

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

  const removeFromCart = (itemKey: string) => {
    setCart(prevCart => prevCart.filter(item => cartItemKey(item) !== itemKey));
  };

  const updateCartItemQuantity = (itemKey: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        cartItemKey(item) === itemKey ? { ...item, quantity } : item
      )
    );
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      cart,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
    }),
    [user, cart]
  );

  return (
    <AppContext.Provider 
      value={value}
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