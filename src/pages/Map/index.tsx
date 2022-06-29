/*  User */
import { useRecoilState } from 'recoil';
import React, { useState, useEffect, useContext } from 'react';
import Chat from './chat';
import * as atom from '../../common/atom';

// ユーザーページ
const Map = () => {


  const [user, setUser] = useRecoilState(atom.user_info);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      <p>今はユーザー登録をできる仮ページだよ</p>
      userid: <input type="text" name="user_id" className="mr-5 w-50 h-10 p-3 border-2 border-sky-300 rounded-xl" onChange={handleChange} value={user.user_id} />
      username: <input type="text" name="user_name" className="mr-5 w-50 h-10 p-3 border-2 border-sky-300 rounded-xl" onChange={handleChange} value={user.user_name} />
      screenname: <input type="text" name="screen_name" className="mr-5 w-50 h-10 p-3 border-2 border-sky-300 rounded-xl" onChange={handleChange} value={user.screen_name} />
      <h1>日誌</h1>
      <Chat />
    </>
  );
};

export default Map;