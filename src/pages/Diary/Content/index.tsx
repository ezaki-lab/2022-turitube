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

// 日誌 - index
const DiaryContent = () => {
  const { diaryId } = useParams();
  useEffect(() => {

  }, []);

  return (
    <>
      <BackHeader title="日誌" path="/diary" />
      <div className="h-full w-full flex flex-col items-center pt-16 overflow-y-auto">
        <div className="max-h-[400px] h-1/2 w-full max-w-5xl flex flex-col pb-3 px-2">
          <DiaryCarousel />
        </div>
        <div className="w-full h-20 flex-auto overflow-y-auto max-w-5xl px-8">
          <Detail Image={Calendar} data="2022/02/08" />
          <Detail Image={Pin} data="フェリー乗り場" />
          <Detail Image={SumFish} data="アジ(1) タイ(1) カサゴ(2)" />
          <Detail Image={Group} data="小坂の釣り配信！" />
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

export default DiaryContent;