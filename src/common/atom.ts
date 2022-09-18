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

interface ExplainModalInfo {
  title: null|string,
  text: null|string,
  caption: null|string,
  is_open: boolean
}

// グローバルstate
export const user_info = atom({
  key: 'user_info',
  default: <UserData|null>{
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

export const explain_modal_info = atom({
  key: 'explain_modal_info',
  default: <ExplainModalInfo>{
    is_open: false
  }
})
