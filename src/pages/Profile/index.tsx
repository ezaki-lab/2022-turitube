import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import AvatarCreate from './avatarCreation';
import ProfileIcon from "../../img/icons/profile.png";
import axios from 'axios'

// ユーザープロフィール表示コンポーネント
const Profile = () => {
  const base_url = "https://ezaki-lab.cloud/~turitube/api/signin";
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

  const Logout = () => {
    setUserInfo(null);
    localStorage.setItem("userId", "");
  };

  // ユーザーデータ(名前とかアバター)を更新
  useEffect(() => {
    return () => {
      console.log(userInfo);
      axios.put(base_url, userInfo);
    }
  }, [userInfo]);

  return (
    <>
      <div className="w-full justify-center items-center flex h-96">
        <div className="w-64 h-64 bg-basic rounded-2xl flex flex-col items-center justify-center">
          <img src={ProfileIcon} className="h-24 rounded-full py-1" />
          <p className="text-white font-bold py-1">ユーザーID {userInfo.user_name}</p>
          <p className="text-white font-bold py-1">ユーザー名 {userInfo.screen_name}</p>
          <button className="btn w-32 py-4" onClick={Logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col p-4 items-center">
        <AvatarCreate />
      </div>
    </>
  );
};

export default Profile;