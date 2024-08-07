import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import { useDrawerCart } from '@/context/CartDrawerContext';
import Loader from '../Loader/Loader';
import { Header } from '../Header';

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

    mockLoader.mockImplementation(() => <div>Loading...</div>);
  });

  it('renders the header component correctly', () => {
    render(<Header />);

    expect(screen.getByAltText('Natura Logo')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('calls openCart when the cart icon button is clicked', () => {
    const { openCart } = mockUseDrawerCart();

    render(<Header />);

    fireEvent.click(screen.getByTestId('cart-icon-button'));

    expect(openCart).toHaveBeenCalledTimes(1);
  });

  it('renders loader when cart data is loading', () => {
    mockUseCart.mockReturnValueOnce({
      data: null,
      isLoading: true,
    });

    render(<Header />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
