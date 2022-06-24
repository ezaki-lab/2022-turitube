import { atom } from 'recoil';

// global state
export const user_info = atom({
  key: 'user_info',
  default: {
    user_id: "123456789",
    user_name: "kosakae256",
    screen_name: "こさか"
  }
});