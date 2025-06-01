import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import { SortOptions } from '../sort-options';

const mockDispatch = vi.fn();

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof import('react-redux')>('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

vi.mock('../../../store', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: vi.fn()
}));

const createMockStore = (currentSort: string = 'Popular') => configureStore({
  reducer: {
    offers: () => ({
      sort: currentSort
    })
  }
});

describe('SortOptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render sort options with current selection', () => {
    render(
      <Provider store={createMockStore()}>
        <SortOptions />
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getAllByText('Popular')).toHaveLength(2);
  });

  it('should show all sort options when clicked', () => {
    render(
      <Provider store={createMockStore()}>
        <SortOptions />
      </Provider>
    );

    const sortButton = screen.getAllByText('Popular')[0].closest('.places__sorting-type');
    fireEvent.click(sortButton as Element);

    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should dispatch action when option is selected', () => {
    render(
      <Provider store={createMockStore()}>
        <SortOptions />
      </Provider>
    );

    const sortButton = screen.getAllByText('Popular')[0].closest('.places__sorting-type');
    fireEvent.click(sortButton as Element);

    const lowToHighOption = screen.getByText('Price: low to high');
    fireEvent.click(lowToHighOption);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should show current sort as active', () => {
    render(
      <Provider store={createMockStore('Price: high to low')}>
        <SortOptions />
      </Provider>
    );

    expect(screen.getAllByText('Price: high to low')).toHaveLength(2);
  });

  it('should close dropdown when option is selected', () => {
    render(
      <Provider store={createMockStore()}>
        <SortOptions />
      </Provider>
    );

    const sortButton = screen.getAllByText('Popular')[0].closest('.places__sorting-type');
    fireEvent.click(sortButton as Element);

    const lowToHighOption = screen.getByText('Price: low to high');
    fireEvent.click(lowToHighOption);

    const dropdown = screen.getByRole('list');
    expect(dropdown).not.toHaveClass('places__options--opened');
  });

  it('should close dropdown when clicking outside', () => {
    render(
      <Provider store={createMockStore()}>
        <SortOptions />
      </Provider>
    );

    const sortButton = screen.getAllByText('Popular')[0].closest('.places__sorting-type');
    fireEvent.click(sortButton as Element);

    fireEvent.mouseDown(document.body);

    const dropdown = screen.getByRole('list');
    expect(dropdown).not.toHaveClass('places__options--opened');
  });
});
