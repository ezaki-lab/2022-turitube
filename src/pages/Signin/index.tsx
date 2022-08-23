import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import axios from 'axios'

const Signin = () => {
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);
  const loginUserNameRef = useRef(null);
  const newUserNameRef = useRef(null);
  const newScreenNameRef = useRef(null);

  const base_url = "https://ezaki-lab.cloud/~turitube/api/signin";

  // 既存アカウントにログイン
  const Login = () => {
    axios.get(base_url, {
      params: {
        user_name: loginUserNameRef.current.value
      }
    }).then((res) => {
      if (res.data.status) {
        localStorage.setItem("userId", res.data.user_id);
        setUserInfo({
          user_id: res.data.user_id,
          user_name: res.data.user_name,
          screen_name: res.data.screen_name,
          avatar: res.data.avatar
        });
      }
      else {
        ;
      }
    })
  };

  // アカウント新規登録
  const CreateNew = () => {
    console.log(newUserNameRef.current.value, newScreenNameRef.current.value)
    axios.post(base_url, {
      user_name: newUserNameRef.current.value,
      screen_name: newScreenNameRef.current.value,
      avatar: userInfo.avatar
    }).then((res) => {
      if (res.data.status) {
        localStorage.setItem("userId", res.data.user_id);
        setUserInfo((rev) => ({
          ...rev,
          user_id: res.data.user_id,
          user_name: newUserNameRef.current.value,
          screen_name: newScreenNameRef.current.value,
        }))
      }
      else {
        ;
      }
    })
  };

  return (
    <>
      <div className="flex flex-col justify-around p-4 mb-12 h-48">
        <p>ログインまたは新規作成してください</p>
        <input type="text" ref={loginUserNameRef} placeholder="userId" className="input input-bordered w-64" />
        <button className="btn w-32" onClick={Login}>
          ログイン
        </button>
      </div>

      <div className="flex flex-col justify-around p-4 h-48">
        <input type="text" ref={newUserNameRef} placeholder="userId" className="input input-bordered w-64" />
        <input type="text" ref={newScreenNameRef} placeholder="ユーザー名" className="input input-bordered w-64" />
        <button className="btn w-32" onClick={CreateNew}>
          新規登録
        </button>
      </div>
    </>
  );
};

export default Signin;