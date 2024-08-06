import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import { render } from '@testing-library/react';
import { Banner } from './Banner';

describe('Banner Component', () => {
  it('renders the banner text correctly', () => {
    const { getByText } = render(<Banner />);

    expect(getByText('NATURA BEM-ESTAR')).toBeInTheDocument();
    expect(getByText('Cuide-se com a gente.')).toBeInTheDocument();
  });

  it('renders the banner image with correct alt text', () => {
    const { getByAltText } = render(<Banner />);

    const image = getByAltText('Imagem do Banner inicial');
    expect(image).toBeInTheDocument();
  });
});
