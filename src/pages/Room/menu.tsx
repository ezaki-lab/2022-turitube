import React, { useEffect, useState, createContext, useRef } from 'react';
import Setting from '../../img/icons/setting.png';
import Person from '../../img/icons/person.png'
import Camera from '../../img/icons/camera.png';

const Menu = ({visible}) => {
  return (<>
    <div className={`fixed z-100 bottom-16 flex flex-col justify-end bg-white bg-opacity-75 ml-2 pl-2 rounded-xl ${!visible ? "hidden" : ""}`}>
      <label htmlFor="users-modal" className="h-8 md:h-10 w-full flex flex-row items-center py-1">
        <img src={Person} className="h-full object-cover h-2/3 mr-2" />
        <p className="text-md font-bold text-black mr-2">参加ユーザー</p>
      </label>
      <label htmlFor="setting-modal" className="h-8 md:h-10 flex flex-row items-center py-1">
        <img src={Setting} className="h-full object-cover aspect-square h-2/3 mr-2" />
        <p className="text-md font-bold text-black">配信設定</p>
      </label>
      <label htmlFor="photograph-modal" className="h-8 md:h-10 flex flex-row items-center py-1">
        <img src={Camera} className="h-full object-cover aspect-square h-2/3 mr-2" />
        <p className="text-md font-bold text-black">魚を撮影する</p>
      </label>
    </div>
  </>)
}

export default Menu