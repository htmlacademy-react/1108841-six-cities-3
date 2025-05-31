import { render, screen } from '@testing-library/react';
import MainEmpty from '../main-empty';

describe('MainEmpty', () => {
  it('should render empty state message', () => {
    const city = 'Amsterdam';
    render(<MainEmpty city={city} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
  });
});
