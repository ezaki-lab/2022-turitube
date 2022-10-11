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
import axios from 'axios';
import Url from '../../../utils/url';

interface Locus {
  content: string,
  time: string,
  text: string
}

interface DiaryData {
  date: string,
  place_name: string,
  fishes: string,
  group_name: string,
  user_count: string,
  timer: string,
  locus: Locus[]
}

// 日誌 - index
const DiaryContent = () => {
  const { diaryId } = useParams();
  const [imgList, setImgList] = useState([]);
  const [diaryData, setDiaryData] = useState<DiaryData>();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    axios.get(Url("/diary"), {
      params: {
        diary_id: diaryId
      }
    }).then((res) => {
      setReady(true);
      setDiaryData(res.data.data);
      setImgList(res.data.imgList);
    })
  }, []);

  return (
    <>
      <BackHeader title="日誌" path="/diary" />
      {!ready
        ? <></>
        : <div className="h-full w-full flex flex-col items-center pt-16 overflow-y-auto">
          <div className="max-h-[400px] h-1/2 w-full max-w-5xl flex flex-col pb-3 px-2">
            <DiaryCarousel imgList={imgList} />
          </div>
          <div className="w-full h-20 flex-auto overflow-y-auto max-w-5xl px-8">
            <Detail Image={Calendar} data={diaryData.date} />
            <Detail Image={Pin} data={diaryData.place_name} />
            <Detail Image={SumFish} data={!diaryData.fishes ? "釣果無し" : diaryData.fishes} />
            <Detail Image={Group} data={diaryData.group_name} />
            <Detail Image={EnteredSum} data={`${diaryData.user_count}人`} />
            <Detail Image={Time} data={diaryData.timer} />
            <div className="flex flex-row items-start pb-2 sm:pb-3 space-x-3">
              <img src={Footprints} className="h-6 sm:h-8 mt-3" />
              <ul className="steps steps-vertical w-full">
                {diaryData.locus.map((v, index) => (
                  <li data-content={v.content} className="step step-neutral text-tcolor font-bold">{v.time} {v.text}</li>
                ))}
              </ul>

            </div>
          </div>
        </div>}
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