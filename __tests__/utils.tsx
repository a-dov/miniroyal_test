import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
// add custom jest matchers from jest-dom

import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import setupStore from '../src/store';
import { theme } from '../src/styles/theme/default';

export const mockDataCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'Tatooine',
  url: 'https://swapi.dev/api/people/1',
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
