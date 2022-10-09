import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useCamera from '../../hooks/useCamera';
import User from '../../components/User';
import useUserData from '../../hooks/useUserData';
import axios from 'axios';
import Url from '../../utils/url';

// Home - index.tsx
const Debug = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [isLogin, setIsLogin] = useRecoilState(atom.is_login);
  const [isFront, setIsFront] = useState<boolean>(false);
  const { videoRef, localStream, readyCam, setConstraints } = useCamera({ video: { facingMode: "user" }, audio: true });
  const userData = useUserData("kosakae256");

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
/*
  return (
    <>
      <div className="bg-red-200 w-full h-full flex sm-max:flex-col">
          <div className="bg-yellow-200 sm-max:w-[400px] sm-max:mx-auto sm-max:max-w-full sm:h-[400px] sm:max-h-[100%] sm:my-auto md:h-[500px] lg:w-[650px] xl:w-[800px] aspect-square">
            
          </div>
          <div className="bg-green-200 flex-auto">
            
          </div>
      </div>    
    </>
  )
*/
  
  return (
    <>
      <User data={userData} />
    </>
  )

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