import { atom } from 'recoil';

// global state
export const user = atom({
  key: 'user',
  default: 'user'
});