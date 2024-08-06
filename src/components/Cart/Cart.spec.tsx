import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Cart } from './Cart';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import { CartApi } from '@/services/cart.service';
import { useToast } from '@/hooks/useToast';
import { numberFormat } from '@/utils/numberFormat';

// Mock das dependências
jest.mock('@/context/AuthContext');
jest.mock('@/hooks/useCart');
jest.mock('@/services/cart.service');
jest.mock('@/hooks/useToast');

const mockUseAuth: any = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseCart: any = useCart as jest.MockedFunction<typeof useCart>;
const mockUseToast = useToast as jest.MockedFunction<typeof useToast>;
const mockRemoveItem = CartApi.removeItem as jest.MockedFunction<
  typeof CartApi.removeItem
>;

describe('Cart Component', () => {
  const closeCart = jest.fn();
  const toast = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { id: 'user-id' } });
    mockUseCart.mockReturnValue({
      data: {
        carts: [
          {
            id: '1',
            product: {
              name: 'Product 1',
              image: 'image1.jpg',
              price: 100,
            },
          },
        ],
        amountTotalProducts: 100,
      },
    });
    mockUseToast.mockReturnValue({ toast });
  });

  it('should be renders the cart component correctly', () => {
    render(<Cart isCartOpen={true} closeCart={closeCart} />);

    expect(screen.getByText('Minha sacola')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText(`R$ ${numberFormat(100)}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Sub-total: R$ ${numberFormat(100)}`),
    ).toBeInTheDocument();
  });
});
