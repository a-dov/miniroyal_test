import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Character } from '../../types/Character.type';

const characterSlice = createSlice({
  name: 'character',
  initialState: {
    character: {},
  } as { character?: Character },
  reducers: {
    saveCharacter: (state, { payload }: PayloadAction<Character>) => ({
      ...state,
      character: payload,
    }),
  },
});

export const { saveCharacter } = characterSlice.actions;

export default characterSlice.reducer;
