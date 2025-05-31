import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Sort from '../sort';
import { vi } from 'vitest';

const mockStore = configureStore({
  reducer: {
    offers: () => ({
      sort: 'Popular'
    })
  }
});

const mockOnSortChange = vi.fn();

describe('Sort', () => {
  it('should render all sort options when opened', () => {
    render(
      <Provider store={mockStore}>
        <Sort currentSort="Popular" onSortChange={mockOnSortChange} />
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByText('Popular')).toHaveLength(2);
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should show current sort type', () => {
    render(
      <Provider store={mockStore}>
        <Sort currentSort="Price: low to high" onSortChange={mockOnSortChange} />
      </Provider>
    );

    expect(screen.getAllByText('Price: low to high')).toHaveLength(2);
  });
});
