import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import characterReducer from './slices/Character.slice';

const store = (preloadedState: Record<string, any>) => configureStore({
  reducer: {
    character: characterReducer,
  },
  preloadedState,
});

export default store;

export type RootState = ReturnType<typeof store>['getState'];
export const useAppSelector: TypedUseSelectorHook<ReturnType<RootState>> = useSelector;

export type AppDispatch = ReturnType<typeof store>['dispatch'];
