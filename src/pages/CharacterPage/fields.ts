import { Character } from '../../types/Character.type';

export const fields: Partial<Record<keyof Character, string>> = {
  birth_year: 'Birth Year',
  height: 'Height',
  mass: 'Mass',
  gender: 'Gender',
  hair_color: 'Hair Color',
  skin_color: 'Skin Color',
  eye_color: 'Eye Color',
};
