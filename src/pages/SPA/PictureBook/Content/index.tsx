import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import UndeFined from "../../../../img/icons/picture_book_undefined.png";
import { useParams } from 'react-router-dom';
import BackHeader from '../../../../components/BackHeader';
import Calendar from "../../../../img/icons/calendar.png";
import Pin from "../../../../img/icons/pin.png";
import Measure from "../../../../img/icons/measure.png";
import SumFish from "../../../../img/icons/sum_fish.png";
import MaxSize from "../../../../img/icons/max_size.png";
import StabbedPin from "../../../../img/icons/stabbed_pin.png";
import StabbedPin2 from "../../../../img/icons/stabbed_pin2.png";

// 図鑑 - index
const PictureBookContent = () => {
  const { fishId } = useParams();
  const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  useEffect(() => {

  }, []);

  return (
    <>
      <BackHeader title="図鑑" path="/picture_book" />

      <div className="w-full h-full flex sm-max:flex-col sm-max:items-start sm-max:justify-center sm:flex-row sm:justify-center pt-16 px-8 pb-4 overflow-y-auto">

        <div className="sm-max:h-32 sm-max:w-full sm:h-full sm:w-32 flex-auto flex flex-col items-center max-w-4xl">
          <img src={UndeFined} className="h-16 flex-auto w-full object-contain bg-gray-dark mb-2 rounded-2xl md:rounded-3xl lg:roundex-5xl" />
          <h2 className="h-8 text-2xl lg:text-3xl text-tcolor font-bold">アジ</h2>
          <div className="w-full h-12 flex items-center justify-center">
            <div className="h-full flex flex-row space-x-2 items-center pl-2 overflow-x-auto border-l-4 border-gray">
              {t.map((value, index) => {
                return (
                  <div className="rounded-full w-10 h-10 bg-basic flex items-center justify-center flex-none" key={value}>
                    <p className="text-white font-bold text-md">{value}</p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>

        <div className="sm-max:h-72 sm-max:w-full sm-max:py-3 sm:pb-2 sm:h-full sm:pl-3 sm:w-80 md:w-96 relative">
          <div className="h-1/2 bg-white drop-shadow-xl mb-3 pl-1 flex flex-col">
            <h3 className="mx-auto text-xl sm:text-lg text-tcolor font-bold">魚の情報</h3>
            <Detail Image={Calendar} data="2022/09/15 22:23" />
            <Detail Image={Pin} data="ポンツーン号" />
            <Detail Image={Measure} data="12cm" />
            <img src={StabbedPin} className="absolute top-1 right-1 w-8" />
          </div>
          <div className="h-1/2 bg-white drop-shadow-xl mt-3 pl-1 flex flex-col relative">
            <h3 className="mx-auto text-xl sm:text-lg text-tcolor font-bold">累計情報</h3>
            <Detail Image={SumFish} data="20匹" />
            <Detail Image={MaxSize} data="20cm" />
            <img src={StabbedPin2} className="absolute top-1 right-1 w-8" />
          </div>
        </div>
      </div>
    </>
  )
};

const Detail = ({ Image, data }) => {
  return (
    <div className="flex flex-row items-center mb-2 space-x-3">
      <img src={Image} className="h-6" />
      <p className="text-tcolor text-lg sm:text-md">{data}</p>
    </div>
  )
}

export default PictureBookContent;