import React, { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import Url from '../utils/url';

interface UserData {
  user_name: string,
  screen_name: string,
  icon: string,
  introduction: string,
  exp: number,
  lv: number,
  title: string,
  avatar: {
    hat: number,
    hair: number,
    bottoms: number,
    tops: number,
    fishing_rod: number
  }
}

// user_nameから取れる情報を取ってくる
const useUserData = (user_name) => {
  const [userData, setUserData] = useState<UserData>(null);
  useEffect(() => {
    axios.get(Url("/user"), {
      params:{
        user_name:user_name
      }
    }).then((res) => {
      setUserData(res.data);
    })
  }, [])
  return userData
};

export default useUserData