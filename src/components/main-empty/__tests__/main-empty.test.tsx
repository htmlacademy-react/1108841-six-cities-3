import { render, screen } from '@testing-library/react';
import MainEmpty from '../main-empty';

describe('MainEmpty', () => {
  it('should render empty state with correct text', () => {
    render(<MainEmpty city="Paris" />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/)).toBeInTheDocument();
  });
});
