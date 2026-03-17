'use client';

import React, { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from 'react';

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

function mergeCarts(localItems: CartItem[], serverItems: CartItem[]) {
  const byKey = new Map<string, CartItem>();
  for (const item of serverItems) byKey.set(cartItemKey(item), item);
  for (const item of localItems) {
    const key = cartItemKey(item);
    const existing = byKey.get(key);
    if (existing) {
      byKey.set(key, { ...existing, quantity: existing.quantity + item.quantity });
    } else {
      byKey.set(key, item);
    }
  }
  return Array.from(byKey.values());
}

export function Providers({ children }: ProvidersProps) {
  // User State
  const [user, setUser] = useState<User | null>(null);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartHydratedFromServerRef = useRef(false);
  const lastSyncedCartJsonRef = useRef<string>('');

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

  // When user is logged in, load server cart and merge guest cart.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user?.id) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/cart', { method: 'GET' });
        if (!res.ok) return;
        const data = (await res.json().catch(() => null)) as { items?: CartItem[] } | null;
        const serverItems = Array.isArray(data?.items) ? data!.items! : [];
        if (cancelled) return;

        let mergedToSave: CartItem[] | null = null;
        setCart((localItems) => {
          const merged = mergeCarts(localItems, serverItems);
          mergedToSave = merged;
          cartHydratedFromServerRef.current = true;
          lastSyncedCartJsonRef.current = JSON.stringify(merged);
          return merged;
        });

        // Persist merged cart to server
        if (mergedToSave) {
          await fetch('/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: mergedToSave }),
          });
        }
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Sync cart changes to server (debounced) when logged in
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!user?.id) return;
    if (!cartHydratedFromServerRef.current) return;

    const json = JSON.stringify(cart);
    if (json === lastSyncedCartJsonRef.current) return;

    const t = window.setTimeout(async () => {
      try {
        const res = await fetch('/api/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cart }),
        });
        if (res.ok) lastSyncedCartJsonRef.current = json;
      } catch {
        // ignore
      }
    }, 500);

    return () => window.clearTimeout(t);
  }, [cart, user?.id]);

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