import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CircularProgress } from '@mui/material';
import Loader from './Loader';

describe('Loader Component', () => {
  it('renders the CircularProgress correctly', () => {
    render(<Loader />);

    const circularProgress = screen.getByRole('progressbar');

    expect(circularProgress).toBeInTheDocument();

    expect(circularProgress).toHaveClass('MuiCircularProgress-root');
  });
});
