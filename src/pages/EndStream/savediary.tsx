import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import React, { useEffect, useState, useRef } from 'react';
import Calendar from "../../img/icons/calendar.png";
import Pin from "../../img/icons/pin.png";
import SumFish from "../../img/icons/sum_fish.png";
import Group from "../../img/icons/group.png";
import EnteredSum from "../../img/icons/entered_sum.png";
import Time from "../../img/icons/time.png";
import Footprints from "../../img/icons/Footprints.png";
import TitleHeader from '../../components/TitleHeader';
import Url from '../../utils/url';
import today from '../../utils/today';
import TitleIcon from "../../img/icons/title.png";
import axios from 'axios';

interface Locus {
  content: string,
  time: string,
  text: string
}

interface Diary {
  date: string,
  place: string,
  sum_fish: number,
  group_name: string,
  entered: string,
  time: string,
  imgs: [],
  fishes: string
  locus: Locus[]
}

// 日誌 - index
const SaveDiary = ({ setNext, stream, imgDataList }) => {
  const [diary, setDiary] = useState<Diary>(null);
  const [locus, setLocus] = useRecoilState(atom.locus);
  const [me] = useRecoilState(atom.me);
  const title = useRef(null);

  useEffect(() => {
    var place = "記録なし";
    if (imgDataList.length) place = imgDataList[0].place_name;
    var book = imgDataList.filter(data => data.type == "book")
    var fishes = book.map((v, index) => v.fish).join(",")
    setDiary(
      {
        date: today(),
        place: place,
        sum_fish: 1,
        group_name: stream.title,
        entered: stream.count + "人",
        time: stream.time,
        imgs: imgDataList.map((v, i) => v.img_name),
        fishes: fishes,
        locus: locus,
      }
    )
  }, []);

  const save = () => {
    axios.post(Url("/diary"), {
      title: !title.current.value ? me.screen_name + "の釣り日誌" : title.current.value,
      user_id: me.user_id,
      user_name: me.user_name,
      data: diary,
    })
    setNext(2);
  }

  if (!diary) return (<></>);
  return (
    <>
      <TitleHeader title="日誌の登録" />
      <div className="h-full w-full flex flex-col items-center pt-14 overflow-y-auto">
        <div className="max-h-[400px] h-1/2 w-full max-w-5xl flex flex-col pb-3 px-2">
          <DiaryCarousel data={imgDataList} />
        </div>
        <div className="w-full h-20 flex-auto overflow-y-auto max-w-5xl px-8 pt-4">

          <div className="flex flex-row items-center pb-2 sm:pb-3 space-x-3 h-10">
            <img src={TitleIcon} className="h-6 sm:h-8" />
            <input ref={title} type="text" className="text-tcolor text-lg sm:text-xl border-2 border-gray rounded-xl pl-2" placeholder="日誌のタイトルを入力"></input>
          </div>
          <Detail Image={Calendar} data={diary.date} />
          <Detail Image={Pin} data={diary.place} />
          <Detail Image={SumFish} data={!diary.fishes ? "釣果無し" : diary.fishes} />
          <Detail Image={Group} data={diary.group_name} />
          <Detail Image={EnteredSum} data={diary.entered} />
          <Detail Image={Time} data={diary.time} />

          <div className="flex flex-row items-start pb-2 sm:pb-3 space-x-3">
            <img src={Footprints} className="h-6 sm:h-8 mt-3" />
            <ul className="steps steps-vertical w-full">
              {diary.locus.map((v, index) => (
                <li data-content={v.content} className="step step-neutral text-tcolor font-bold">{v.time} {v.text}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-12 w-full flex justify-center space-x-4 items-center px-8 border-t border-gray" >
          <button className="bg-gray-dark text-white font-bold p-3 px-4 text-sm rounded-xl w-32 active:animate-button-push" onClick={() => { setNext(2); }}>保存せず次へ</button>
          <button className="bg-basic text-white font-bold p-3 px-4 text-sm rounded-xl w-32 active:animate-button-push" onClick={() => { save(); }}>保存する</button>
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

const DiaryCarousel = ({ data }) => {
  if (!data.length) return (
    <div className="h-full w-full max-w-5xl flex items-center justify-center">
      <p className="text-basic text-xl font-bold">配信中の写真がありません</p>
    </div>)
  return (
    <>
      <div className="carousel carousel-center h-20 flex-auto space-x-4 max-w-5xl">
        {data.map((v, i) => {
          return (
            <div className="carousel-item h-full aspect-video max-w-[80%] rounded-xl bg-gray mx-auto" key={i}>
              <img src={Url(`/img/stream_photo/${v.img_name}`)} className="h-full w-full object-contain rounded-xl" />
            </div>
          )
        })}
      </div>
    </>
  )
};

export default SaveDiary;