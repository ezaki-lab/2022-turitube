import { atom } from 'recoil';

interface UserData {
  user_id: string,
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
