import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CardProducts } from './CardProducts';
import { numberFormat } from '@/utils/numberFormat';

// Mock do módulo numberFormat
jest.mock('@/utils/numberFormat', () => ({
  numberFormat: jest.fn((price) => price.toString()),
}));

describe('CardProducts Component', () => {
  const props = {
    image: '/path/to/image.jpg',
    name: 'Product Name',
    brand: 'Brand Name',
    price: 100,
    isLaunch: true,
  };

  const onClick = jest.fn();

  it('should be render calls onClick when the card is clicked', () => {
    const { getByRole } = render(
      <CardProducts props={props} onClick={onClick} />,
    );

    // Simula o clique no card
    fireEvent.click(getByRole('button', { hidden: true }));

    // Verifica se a função onClick foi chamada
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
