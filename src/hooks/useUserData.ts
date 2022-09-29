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
    hat: string,
    head: string,
    body: string,
    waist: string,
    fishing_rod: string
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

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return userData
};

export default useUserData