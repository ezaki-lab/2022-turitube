import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../../common/atom';
import CloseButton from "../../../img/buttons/close.png";
import Title from '../../Title';
import axios from 'axios';
import Url from '../../../utils/url';
import useGetItems from '../../../hooks/useGetItems';
import ChangeImgButton from "../../../img/buttons/change_img.png";

// プロフィールモーダル
const ProfileComponent = ({ setModalId = null, enable = true }) => {
  const [tab, setTab] = useState<number>(0);
  const [me, setMe] = useRecoilState(atom.me);

  const closeModal = () => {
    axios.put(Url("/user"), me)
      .then(() => {
        setModalId(null);
      })
  };

  return (
    <>
      <div className={`mx-4 h-full w-full max-w-4xl bg-white drop-shadow-2xl rounded-2xl flex flex-col ${!enable ? "animate-fadein" : ""}`}>

        <div className="w-full max-w-4xl rounded-md flex flex-row items-center justify-center pt-2">
          <button className="border border-gray-dark rounded-l-md" onClick={() => { setTab(0) }}>
            <h3 className={tab == 0 ? "text-white bg-basic border-white font-bold text-xs lg:text-sm border-[3px] rounded-l-md px-4 py-1" : "text-tcolor bg-white border-gray font-bold text-xs lg:text-sm border-2 rounded-l-md px-4 py-1"}>基本プロフィール</h3>
          </button>
          <button className="border-y border-r border-gray-dark rounded-r-md" onClick={() => { setTab(1) }}>
            <h3 className={tab == 1 ? "text-white bg-basic border-white font-bold text-xs lg:text-sm border-[3px] rounded-r-md px-4 py-1" : "text-tcolor bg-white border-gray font-bold text-xs lg:text-sm border-2 rounded-r-md px-4 py-1"}>アバター</h3>
          </button>
        </div>

        <div className="h-20 flex-auto mx-4 my-1 mb-2 flex sm-max:flex-col sm:flex-row rounded-2xl drop-shadow-2xl bg-white border-gray">
          {tab == 0 ? <User /> : <></>}
          {tab == 1 ? <Avatar /> : <></>}
        </div>

        {!enable
          ? <button className="pb-2 w-full flex justify-center active:animate-button-push" onClick={() => { closeModal(); }}>
            <img src={CloseButton} className="w-24" />
          </button>
          : <></>}
      </div>
    </>
  );
};

const User = () => {
  const screenNameRef = useRef(null);
  const introductionRef = useRef(null);
  const titles = useGetItems("title");
  const [me, setMe] = useRecoilState(atom.me);

  useEffect(() => {
    screenNameRef.current.value = me.screen_name;
  }, [screenNameRef.current]);

  useEffect(() => {
    introductionRef.current.value = me.introduction;
  }, [introductionRef.current]);


  const handleOnAddImage = (e) => {
    var base64img = null;

    const reader = new FileReader()
    reader.onload = async (event) => {
      base64img = await reader.result;
      axios.put(Url("/icon"), {
        user_id: me.user_id,
        base64img: base64img
      }).then((res) => {
        setMe((rev) => ({ ...rev, icon: res.data.img_name }))

      })
    }
    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <>
      <div className="h-full w-full flex flex-col items-center sm:flex-row rounded-2xl bg-white drop-shadow-lg p-2">
        <div className="sm-max:h-[200px] sm-max:w-full sm:w-56 sm:h-full flex flex-col items-center justify-center p-2">
          <div className="h-2 flex-auto sm:max-h-48 max-w-sm aspect-square rounded-full border-2 border-gray-dark relative">
            <img src={Url(`/img/icon/${me.icon}`)} className="h-full w-full max-w-sm aspect-square rounded-full object-cover border border-gray-dark" />
            <input id={"img_select"} type="file" accept="image/*,.png,.jpg,.jpeg,.gif" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)} />
            <label htmlFor={"img_select"} className="absolute h-[40px] top-0 right-0">
              <img src={ChangeImgButton} className="h-full" />
            </label>
          </div>

          <input ref={screenNameRef} type="text" maxLength={10} className="h-6 text-xl text-tcolor font-bold text-center w-full max-w-[200px]" onChange={() => { setMe((rev) => ({ ...rev, screen_name: screenNameRef.current.value })) }} />
          <h3 className="h-4 text-sm text-gray mb-1">@{me.user_name}</h3>
          <Title title_id={me.title} scale="mini" />
        </div>
        <div className="sm-max:h-2 sm-max:w-full sm:w-2 sm:h-full flex-auto flex flex-col p-2 overflow-y-auto">
          <div className="flex flex-col bg-white drop-shadow-md mb-2 pb-2 flex-auto">
            <Label text="ステータス" />
            <p className="text-tcolor pl-2">Lv. {me.lv}</p>
          </div>

          <div className="flex flex-col bg-white drop-shadow-md pb-2 mb-2 flex-auto">
            <Label text="自己紹介" />
            <div className="w-full flex items-center justify-center">
              <textarea ref={introductionRef} placeholder="自己紹介を書こう！" className="border-2 border-gray rounded-md w-full h-16 mx-2 px-1 resize-none" onChange={() => { setMe((rev) => ({ ...rev, introduction: introductionRef.current.value })) }} />
            </div>
          </div>

          <div className="flex flex-col bg-white drop-shadow-md pb-2 mb-2 flex-auto">
            <Label text="称号の変更" />
            <div className="w-full flex flex-wrap justify-center items-center">
              {titles.map((value, index) => {
                return (
                  <button className="mx-1 my-1" onClick={() => { setMe((rev) => ({ ...rev, title: value.item_id })) }} key={index}>
                    <Title title_id={value.item_id} scale="mini" explain={false} />
                  </button>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

const Avatar = () => {
  return (
    <>
      <div className="h-full w-full flex h-xs:flex-col h-xs-max:flex-row items-center rounded-2xl bg-white drop-shadow-lg">
        <div className="flex items-center justify-center h-xs:w-full h-xs:h-24 h-xs:flex-auto h-xs-max:w-64 h-xs-max:h-full">
          <div className="bg-blue-200 h-5/6 aspect-[2/3]">

          </div>
        </div>
        <div className="h-xs:h-48 h-xs:w-full h-xs-max:h-full h-xs-max:flex-auto h-xs-max:w-12 p-2 flex flex-col justify-end space-y-1">
          <div className="h-36 w-full overflow-x-auto flex flex-row items-center space-x-2">
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
          </div>
          <div className="h-12 w-full overflow-x-auto flex flex-row items-center border-t border-gray-dark space-x-2">
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
            <img src="https://www.ana.co.jp/www2/travelandlife/article/id000001/000919/images/img_head_pc.jpg" className="h-full flex-none" />
          </div>
        </div>
      </div>
    </>
  )
}

const Label = ({ text }) => {
  return (
    <>
      <div className="w-24 py-1 flex items-center bg-basic justify-center mb-2">
        <p className="text-white text-xs">{text}</p>
      </div>
    </>
  )
}

export default ProfileComponent;