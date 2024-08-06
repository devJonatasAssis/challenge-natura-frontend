import '@testing-library/jest-dom';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './Header';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useDrawerCart } from '@/context/CartDrawerContext';
import Loader from '../Loader/Loader';

// Mock das dependências
jest.mock('@/context/AuthContext');
jest.mock('@/hooks/useCart');
jest.mock('@/context/CartDrawerContext');
jest.mock('../Loader/Loader');

const mockUseAuth: any = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseCart: any = useCart as jest.MockedFunction<typeof useCart>;
const mockUseDrawerCart: any = useDrawerCart as jest.MockedFunction<
  typeof useDrawerCart
>;
const mockLoader = Loader as jest.MockedFunction<typeof Loader>;

describe('Header Component', () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      isLogged: true,
      user: { id: 'user-id', name: 'Test User' },
    });

    mockUseCart.mockReturnValue({
      data: { total: 3 },
      isLoading: false,
    });

    mockUseDrawerCart.mockReturnValue({
      openCart: jest.fn(),
    });

    mockLoader.mockReturnValue(<div>Loading...</div>);
  });

  it('should be renders the header component correctly', () => {
    render(<Header />);

    expect(screen.getByAltText('Natura Logo')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('o que está buscando hoje?'),
    ).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should be calls openCart when the cart icon button is clicked', () => {
    const { openCart } = mockUseDrawerCart();

    render(<Header />);

    fireEvent.click(screen.getByTestId('cart-icon-button'));

    expect(openCart).toHaveBeenCalledTimes(1);
  });

  it('should be renders loader when cart data is loading', () => {
    mockUseCart.mockReturnValueOnce({
      data: null,
      isLoading: true,
    });

    render(<Header />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
