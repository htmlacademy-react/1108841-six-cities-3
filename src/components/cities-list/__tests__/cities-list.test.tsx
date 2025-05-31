import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CitiesList from '../cities-list';

const mockStore = configureStore({
  reducer: {
    offers: () => ({
      city: {
        name: 'Paris',
        location: {
          latitude: 48.85661,
          longitude: 2.351499,
          zoom: 13
        }
      }
    })
  }
});

describe('CitiesList', () => {
  it('should render all cities', () => {
    render(
      <Provider store={mockStore}>
        <CitiesList />
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should highlight active city', () => {
    render(
      <Provider store={mockStore}>
        <CitiesList />
      </Provider>
    );

    const activeCity = screen.getByText('Paris');
    const activeCityLink = activeCity.closest('a');
    expect(activeCityLink).toHaveClass('tabs__item--active');
  });
});
