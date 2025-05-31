import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { useAppDispatch } from '../use-app-dispatch';

const mockStore = configureStore({
  reducer: {
    test: () => ({ value: 'test' })
  }
});

interface WrapperProps {
  children: ReactNode;
}

const wrapper = ({ children }: WrapperProps) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe('useAppDispatch', () => {
  it('should return typed dispatch function', () => {
    const { result } = renderHook(() => useAppDispatch(), { wrapper });

    expect(typeof result.current).toBe('function');
    expect(result.current).toBe(mockStore.dispatch);
  });

  it('should be able to dispatch action', () => {
    const { result } = renderHook(() => useAppDispatch(), { wrapper });
    const dispatch = result.current;

    const testAction = { type: 'test/action', payload: 'test' };

    expect(() => dispatch(testAction)).not.toThrow();
  });
});
