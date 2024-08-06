import { Cart } from '@/components/Cart/Cart';
import { createContext, ReactNode, useContext, useState } from 'react';

interface CardContextProps {
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

const CartContext = createContext<CardContextProps | undefined>(undefined);

interface CardDrawerProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CardDrawerProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{ isCartOpen, openCart, toggleCart, closeCart }}
    >
      <Cart isCartOpen={isCartOpen} closeCart={closeCart} />
      {children}
    </CartContext.Provider>
  );
};

export const useDrawerCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};
