import { atom } from 'recoil';

interface ExplainModalInfo {
  title: null | string,
  text: null | string,
  caption: null | string,
  is_open: boolean,
  action?: Function
}

interface Me {
  user_id: string,
  user_name: string,
  screen_name: string,
  icon: string,
  introduction: string,
  point: number,
  exp: number,
  lv: number,
  title: string,
  avatar: {
    hat: number,
    hair: number,
    tops: number,
    bottoms: number,
    fishing_rod: number
  }
}

interface ProfileData {
  user_name: string,
  screen_name: string,
  icon: string,
  introduction: string,
  lv: number,
  exp: number,
  title: string,
  avatar: {
    hat: number,
    hair: number,
    tops: number,
    bottoms: number,
    fishing_rod: number
  }
}

// グローバルstate
export const user_id = atom({
  key: 'user_id',
  default: <string>""
});

export const profileData = atom({
  key: 'profileData',
  default: <ProfileData> null
})

export const is_login = atom({
  key: 'is_login',
  default: <boolean>false
})

export const me = atom({
  key: 'me',
  default: <Me>{}
})

export const user_type = atom({
  key: 'user_type',
  default: null
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
