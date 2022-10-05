import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Url from '../../utils/url';
import Title from '../Title';


// Icon 押したらユーザー情報が出てくる丸型のアイコンを提供
const Modal = () => {
  const [profileData, setProfileData] = useRecoilState(atom.profileData);

  if (!profileData) { return (<></>) }
  return (
    <>
      <input type="checkbox" id="profile" className="modal-toggle" />
      <label htmlFor="profile" className="modal cursor-pointer">
        <label className="modal-box relative flex sm-max:flex-col space-y-2" htmlFor="">
          <div className="sm:w-32 flex flex-col justify-center items-center">
            <img src={Url(`/img/icon/${profileData.icon}`)} className="h-28 w-28 mx-auto rounded-full border-2 border-gray-dark object-cover" />
            <h3 className='text-xl h-6 text-tcolor'>{profileData.screen_name}</h3>
            <p className="text-sm h-6 text-gray">@{profileData.user_name}</p>
            <Title title_id={profileData.title} scale="mini" />
          </div>
          <div className="sm:w-2 flex-auto">
            <div className="flex flex-col bg-white shadow-2xl mb-2 pb-2 rounded-xl">
              <Label text="自己紹介" />
              <p className="px-2 text-tcolor">{profileData.introduction}</p>
            </div>
            <div className="flex flex-col bg-white shadow-2xl mb-2 pb-2 rounded-xl">
              <Label text="ステータス" />
              <p className="px-2 text-tcolor">Lv. {profileData.lv}</p>
              <p className="px-2 text-tcolor">Exp. {profileData.exp}</p>
            </div>
          </div>

        </label>
      </label>
    </>
  );
}

const Label = ({ text }) => {
  return (
    <>
      <div className="w-24 py-1 flex items-center bg-basic justify-center">
        <p className="text-white text-xs">{text}</p>
      </div>
    </>
  )
}

export default Modal;