import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useCamera from '../../hooks/useCamera';

// Home - index.tsx
const Debug = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [isLogin, setIsLogin] = useRecoilState(atom.is_login);
  useEffect(() => {
    ;
  }, []);

  const Logout = () => {
    setUserId("");
    localStorage.setItem("userId", "");
    setIsLogin(false);
  };


  // 将来的にはスライドショー流します
  return (
    <>
      <div className="pt-28 pb-28 h-full overflow-y-auto">
        <button className="btn" onClick={(() => {Logout()})}>logout</button>
      </div>
    </>
  );
};

const Video = ({ mode }) => {
  const { videoRef, localStream, readyCam, setConstraints } = useCamera({ audio: false, video: true }, mode);
  return (<video ref={videoRef} playsInline muted />)
}

export default Debug;