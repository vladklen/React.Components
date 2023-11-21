/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable import/prefer-default-export */
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { EnhancedStore, PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer, type RootState } from '../../src/store/store';
import { animeApi } from '../../src/store/animeApi';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      value: {
        value: { search: 'test', page: '5', limit: '10' },
      },
    },
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(animeApi.middleware),
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
