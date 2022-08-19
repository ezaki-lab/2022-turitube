import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

const Profile = () => {

  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

  const Logout = () => {
    setUserInfo(null);
    localStorage.setItem("userId", "");
  };

  console.log(userInfo)

  return (
    <>
      <div className="flex flex-col p-4 items-center">
        <p className="py-2 break-words w-64">user_id: {userInfo.user_id}</p>
        <p className="py-2">user_name: {userInfo.user_name}</p>
        <p className="py-2">screen_name: {userInfo.screen_name}</p>
        <button className="btn w-32 py-4" onClick={Logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;