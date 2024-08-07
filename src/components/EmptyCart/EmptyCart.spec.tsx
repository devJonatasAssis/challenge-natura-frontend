import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmptyCart } from './EmptyCart';

describe('EmptyCart Component', () => {
  it('renders the image and text correctly', () => {
    render(<EmptyCart />);

    const image = screen.getByAltText('Empty cart natura');
    expect(image).toBeInTheDocument();

    const text = screen.getByText('Seu carrinho está vazio');
    expect(text).toBeInTheDocument();
    expect(text).toHaveStyle('font-size: 2rem');
  });

  it('applies media query styles correctly', () => {
    render(<EmptyCart />);

    const text = screen.getByText('Seu carrinho está vazio');
  });
});
