import { useRecoilState } from 'recoil';
import React, { useEffect, useRef } from 'react';
import * as atom from './common/atom';
import TitleHeader from './components/TitleHeader';
import axios from 'axios';
import Url from './utils/url';

// サインインページ
const Signin = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [isLogin, setIsLogin] = useRecoilState(atom.is_login);
  const loginUserNameRef = useRef(null);
  const signinUserNameRef = useRef(null);

  useEffect(() => {
    ;
  }, []);

  const login = () => {
    axios.get(Url("/signin"), {
      params: {
        user_name: loginUserNameRef.current.value
      }
    }).then((res) => {
      if (res.data.status) {
        setUserId(res.data.user_id);
        setIsLogin(true);
        localStorage.setItem("userId", res.data.user_id);
      }
    })
  }

  const createNew = () => {
    axios.post(Url("/signin"), {
      user_name: signinUserNameRef.current.value
    }).then((res) => {
      if (res.data.status) {
        setUserId(res.data.user_id);
        setIsLogin(true);
        localStorage.setItem("userId", res.data.user_id);
      }
    })
  }

  // 将来的にはスライドショー流します
  return (
    <>
      <TitleHeader title="サインインページ" />
      <div className="h-full w-full flex flex-col space-y-16 items-center justify-center">
        <div className="flex flex-col space-y-2">
          <p>ログインする</p>
          <input ref={loginUserNameRef} className="input input-bordered w-32" placeholder="ユーザー名" />
          <button className="btn" onClick={() => { login() }}>送信</button>
        </div>
        <div className="flex flex-col space-y-2">
          <p>新規登録する</p>
          <input ref={signinUserNameRef} className="input input-bordered w-32" placeholder="ユーザー名" />
          <button className="btn" onClick={() => { createNew() }}>送信</button>
        </div>

      </div>
    </>
  );
};

export default Signin;