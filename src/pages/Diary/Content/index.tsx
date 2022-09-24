import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import UndeFined from "../../../img/icons/picture_book_undefined.png";
import { useParams } from 'react-router-dom';
import BackHeader from '../../../components/BackHeader';
import Calendar from "../../../img/icons/calendar.png";
import Pin from "../../../img/icons/pin.png";
import DiaryCarousel from './carousel';
import SumFish from "../../../img/icons/sum_fish.png";
import Group from "../../../img/icons/group.png";
import EnteredSum from "../../../img/icons/entered_sum.png";
import Time from "../../../img/icons/time.png";
import Footprints from "../../../img/icons/Footprints.png";
import { Link } from 'react-router-dom';
import TitleHeader from '../../../components/TitleHeader';

// 日誌 - index
const DiaryContent = () => {
  const { diaryId } = useParams();
  useEffect(() => {

  }, []);

  return (
    <>
      <BackHeader title="日誌" path="/diary" />
      <div className="h-full w-full flex flex-col items-center pt-16 overflow-y-auto">
        <div className="max-h-[400px] h-1/2 w-full max-w-5xl flex flex-col">
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

const Content = () => {
  return (
    <Link to="/diary/1234567890" className="w-full flex flex-row h-24 md:h-28 lg:h-36 xl:h-48 border-b border-gray p-2 max-w-5xl">
      <img src="https://www.bepal.net/wp-content/uploads/2021/07/Amane_turigirl02.jpg" className="h-full aspect-video object-cover" />
      <div className="h-full w-12 flex-auto flex flex-col justify-start px-2 pt-2">
        <h3 className="text-lg sm:text-xl lg:text-2xl text-tcolor truncate">日誌のタイトルああああああ</h3>
        <h3 className="text-md sm:text-xl lg:text-2xl text-tcolor">2022/02/08</h3>
      </div>
    </Link>
  )
};

export default DiaryContent;