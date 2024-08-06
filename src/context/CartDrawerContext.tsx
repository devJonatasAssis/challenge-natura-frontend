import { Cart } from '@/components/Cart/Cart';
import { createContext, ReactNode, useContext, useState } from 'react';

interface CardDrawerContextProps {
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

const CartDrawerContext = createContext<CardDrawerContextProps | undefined>(
  undefined,
);

interface CardDrawerProviderProps {
  children: ReactNode;
}

export const CartDrawerProvider = ({ children }: CardDrawerProviderProps) => {
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
    <CartDrawerContext.Provider
      value={{
        isCartOpen,
        openCart,
        toggleCart,
        closeCart,
      }}
    >
      <Cart isCartOpen={isCartOpen} closeCart={closeCart} />
      {children}
    </CartDrawerContext.Provider>
  );
};

export const useDrawerCart = () => {
  const context = useContext(CartDrawerContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};