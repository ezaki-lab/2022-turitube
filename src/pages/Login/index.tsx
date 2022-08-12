import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

const Login = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const loginUserIdRef = useRef(null);
  const signUserIdRef = useRef(null);
  const signUserNameRef = useRef(null);

  const Login = () => {
    setUserId(loginUserIdRef.current.value);
    localStorage.setItem("userId", loginUserIdRef.current.value)
  }

  const SignIn = () => {
    ;
  }

  return (
    <>
      <div className="flex flex-col justify-around p-4 mb-12 h-48">
        <p>ログインまたは新規作成してください</p>
        <input type="text" ref={loginUserIdRef} placeholder="userId" className="input input-bordered w-64" />
        <button className="btn w-32" onClick={Login}>
          ログイン
        </button>
      </div>

      <div className="flex flex-col justify-around p-4 h-48">
        <input type="text" ref={signUserIdRef} placeholder="userId" className="input input-bordered w-64" />
        <input type="text" ref={signUserNameRef} placeholder="ユーザー名" className="input input-bordered w-64" />
        <button className="btn w-32" onClick={SignIn}>
          新規登録
        </button>
      </div>
    </>
  );
};

export default Login;