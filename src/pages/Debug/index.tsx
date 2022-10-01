import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useCamera from '../../hooks/useCamera';

// Home - index.tsx
const Debug = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [isLogin, setIsLogin] = useRecoilState(atom.is_login);
  const [isFront, setIsFront] = useState<boolean>(false);
  const { videoRef, localStream, readyCam, setConstraints } = useCamera({ video: { facingMode: "user" }, audio: true });

  const Logout = () => {
    setUserId("");
    localStorage.setItem("userId", "");
    setIsLogin(false);
  };

  const changeConstraints = () => {
    setIsFront((rev) => (!rev));
    if (isFront) setConstraints((rev) => ({ ...rev, video: { facingMode: "user" } }));
    else setConstraints((rev) => ({ ...rev, video: { facingMode: { exact: "environment" } } }));
  }

  // 将来的にはスライドショー流します
  return (
    <>
      <div className="pt-28 pb-28 h-full overflow-y-auto">
        <button className="btn" onClick={(() => { Logout() })}>logout</button>
        <video ref={videoRef} playsInline muted />
        <button className="btn" onClick={() => changeConstraints()}>toggle direction</button>
        <p>{readyCam ? "true" : "false"}</p>
      </div>
    </>
  );
};

export default Debug;