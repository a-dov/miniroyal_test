import React from 'react';
import {
  screen, fireEvent, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterPage from '../src/pages/CharacterPage';

import { mockDataCharacter, renderWithProviders } from './utils';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('CharacterPage', () => {
  const mockUseParams = jest.fn().mockReturnValue({ id: '1' });
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => mockUseParams(),
  }));

  const mockEditCharacter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore ignore errors for mocking fetch
    global.fetch = () => {};

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockDataCharacter),
    } as any);

    jest.mock('../src/store/slices/Character.slice', () => ({
      saveCharacter: () => mockEditCharacter(),
    }));
  });

  test('renders edit form when "Edit" button is clicked', async () => {
    const { container } = await act(async () => renderWithProviders(<CharacterPage />));
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const nameInput = container.querySelector('input#name');
    const hairColorInput = container.querySelector('input#hair_color');
    const saveButton = screen.getByText('Save');
    const cancelButton = screen.getByText('Cancel');

    expect(nameInput).toBeInTheDocument();
    expect(hairColorInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  test('dispatches editCharacter action when "Save" button is clicked', async () => {
    const { container, store } = await act(async () => renderWithProviders(<CharacterPage />));
    store.dispatch = jest.fn();
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const nameInput = container.querySelector('input#name')!;
    const homeworldInput = screen.getByLabelText('Hair Color');
    const saveButton = screen.getByText('Save');
    fireEvent.change(nameInput, { target: { value: 'Buke Skywalker' } });
    fireEvent.change(homeworldInput, { target: { value: 'green' } });
    await act(async () => fireEvent.click(saveButton));

    expect(store.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'character/saveCharacter',
        payload: expect.objectContaining({
          name: 'Buke Skywalker',
          hair_color: 'green',
        }),
      }),
    );
  });

  test('cancels edit form when "Cancel" button is clicked', async () => {
    const { container } = await act(async () => renderWithProviders(<CharacterPage />));
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(container.querySelector('h1')?.textContent).toBe(mockDataCharacter.name);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
