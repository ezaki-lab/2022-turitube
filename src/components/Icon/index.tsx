import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import React from 'react';
import Url from '../../utils/url';

// Icon 押したらユーザー情報が出てくる丸型のアイコンを提供
const Icon = ({ data }) => {
  const [profileData, setProfileData] = useRecoilState(atom.profileData);
  if (!data) {
    return (<div className="h-full aspect-square object-cover rounded-full bg-white"></div>)
  }

  return (
    <>
      <label htmlFor="profile" className="h-full aspect-square rounded-full bg-white border border-white" onClick={() => {setProfileData(data)}}>
        <img src={Url(`/img/icon/${data.icon}`)} className="h-full aspect-square object-cover rounded-full" />
      </label>
    </>
  );
}

export default Icon;