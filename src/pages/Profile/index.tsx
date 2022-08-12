import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

const Profile = () => {

  const [userId, setUserId] = useRecoilState(atom.user_id);

  const Logout = () => {
    setUserId(null);
    console.log(userId);
    localStorage.setItem("userId", "");
  };

  return (
    <>
      <div className="flex flex-col p-4 items-center">
        <p>{userId}でログイン中</p>
        <button className="btn w-32" onClick={Logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Profile;