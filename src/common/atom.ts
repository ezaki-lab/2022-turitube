import { atom } from 'recoil';

// global state
export const user_info = atom({
  key: 'user_info',
  default: {
    user_id: <string>localStorage.getItem('userId'),
    user_name: <string>"",
    screen_name: <string>""
  }
});
