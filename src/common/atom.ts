import { atom } from 'recoil';

interface UserData {
  user_id: string,
  user_name: string,
  screen_name: string,
  avatar: {
    hat: number,
    hair: number,
    face: number,
    body: number,
    pants: number,
    foot: number
  }
}

// グローバルstate
export const user_info = atom({
  key: 'user_info',
  default: <UserData>{
    user_id: localStorage.getItem('userId'),
    user_name: "",
    screen_name: "",
    avatar: {
      hat: 0,
      hair: 0,
      face: 0,
      body: 0,
      pants: 0,
      foot: 0
    }
  }
});

export const current_room_id = atom({
  key: 'current_room_id',
  default: ""
})
