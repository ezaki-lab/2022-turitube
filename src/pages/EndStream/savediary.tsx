/*
// 情報保存ページ
const saveInfo = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const navigate = useNavigate();

  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <p>日誌、図鑑登録ページ(配信時のみ)</p>
      <button className="btn" onClick={() => {navigate("/")}}>登録完了</button>
    </>
  );
}
*/
import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import UndeFined from "../../img/icons/picture_book_undefined.png";
import { useParams } from 'react-router-dom';
import BackHeader from '../../components/BackHeader';
import Calendar from "../../img/icons/calendar.png";
import Pin from "../../img/icons/pin.png";
import SumFish from "../../img/icons/sum_fish.png";
import Group from "../../img/icons/group.png";
import EnteredSum from "../../img/icons/entered_sum.png";
import Time from "../../img/icons/time.png";
import Footprints from "../../img/icons/Footprints.png";
import { Link } from 'react-router-dom';
import TitleHeader from '../../components/TitleHeader';
import Kari1 from "../../img/kari.jpg";
import Kari2 from "../../img/kari2.png";

// 日誌 - index
const SaveDiary = ({setNext}) => {
  const { diaryId } = useParams();
  useEffect(() => {

  }, []);

  const save = () => {
    console.log("save");
    setNext(2);
  }

  return (
    <>
      <TitleHeader title="日誌の登録" />
      <div className="h-full w-full flex flex-col items-center pt-14 overflow-y-auto">
        <div className="max-h-[400px] h-1/2 w-full max-w-5xl flex flex-col pb-3 px-2">
          <DiaryCarousel />
        </div>
        <div className="w-full h-20 flex-auto overflow-y-auto max-w-5xl px-8">
          <Detail Image={Calendar} data="2022/08/09" />
          <Detail Image={Pin} data="フェリー乗り場" />
          <Detail Image={SumFish} data="アジ(1) タイ(1) カサゴ(2)" />
          <Detail Image={Group} data="初心者歓迎！量狙いです" />
          <Detail Image={EnteredSum} data="6人" />
          <Detail Image={Time} data="1時間20分" />
          <div className="flex flex-row items-start pb-2 sm:pb-3 space-x-3">
            <img src={Footprints} className="h-6 sm:h-8 mt-3" />
            <ul className="steps steps-vertical w-full">
              <li data-content="!" className="step step-neutral text-tcolor font-bold">12:20 かかった</li>
              <li data-content="?" className="step step-neutral text-tcolor font-bold">12:21 逃げられた</li>
              <li data-content="!" className="step step-neutral text-tcolor font-bold">12:40 かかった</li>
              <li data-content="★" className="step step-neutral text-tcolor font-bold">12:41 カサゴを釣り上げた！</li>
              <li data-content="!" className="step step-neutral text-tcolor font-bold">12:43 掛かった！</li>
              <li data-content="!" className="step step-neutral text-tcolor font-bold">12:44 アジを釣り上げた！</li>
            </ul>
          </div>
        </div>
        <div className="h-12 w-full flex justify-center space-x-4 items-center px-8 border-t border-gray" >
          <button className="bg-gray-dark text-white font-bold p-3 px-4 text-sm rounded-xl w-32 active:animate-button-push" onClick={() => {setNext(2);}}>保存せず次へ</button>
          <button className="bg-basic text-white font-bold p-3 px-4 text-sm rounded-xl w-32 active:animate-button-push" onClick={() => {save();}}>保存する</button>
        </div>
      </div>
    </>
  )
};

const Detail = ({ Image, data }) => {
  return (
    <div className="flex flex-row items-center pb-2 sm:pb-3 space-x-3 h-10">
      <img src={Image} className="h-6 sm:h-8" />
      <p className="text-tcolor text-lg sm:text-xl">{data}</p>
    </div>
  )
}

const DiaryCarousel = () => {
  // 本来は引数で受け取る
  const data = [
    {
      image: Kari1,
    },
    {
      image: Kari2,
    },
    {
      image: Kari2,
    },
    {
      image: Kari2,
    },
    {
      image: Kari2,
    },
    {
      image: Kari2,
    },
    {
      image: Kari2,
    },
  ];

  return (
    <>
      <div className="carousel carousel-center h-20 flex-auto space-x-4 max-w-5xl">
        {data.map((v, i) => {
          return (
            <div className="carousel-item h-full aspect-video max-w-[80%] rounded-xl bg-gray mx-auto" key={i}>
              <img src={v.image} className="h-full w-full object-cover rounded-xl" />
            </div>
          )
        })}
      </div>
    </>
  )
};

export default SaveDiary;