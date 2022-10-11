import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import React, { useEffect, useState } from 'react';
import TitleHeader from '../../components/TitleHeader';
import { Link } from 'react-router-dom';
import Kari4 from "../../img/kari4.png";
import Kari6 from "../../img/kari6.jpg";
import Kari7 from "../../img/kari7.jpg";
import Kari8 from "../../img/kari8.png";
import Kari9 from "../../img/kari9.png";
import Kari10 from "../../img/kari10.png";
import axios from 'axios';
import Url from '../../utils/url';

interface DiaryData {
  diary_id: string,
  title: string,
  date: string,
  thumbnail: string,
}

// 日誌 - index
const Diary = () => {
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]);
  const [user_id] = useRecoilState(atom.user_id);

  useEffect(() => {
    axios.get(Url("/diary"), {
      params:{
        user_id: user_id
      }
    }).then((res) => {
      console.log(res.data);
      setDiaryData(res.data);
    })
  }, []);

  return (
    <>
      <TitleHeader title="日誌" />
      <div className="h-full w-full flex flex-col items-center pt-16 sm:pb-16 sm-max:pb-60 overflow-y-auto">
        {diaryData.map((v, i) => {
          return (<Content data={v} key={i} />)
        })}
      </div>
    </>
  );
};

const Content = ({data}) => {
  return (
    <Link to={`/diary/${data.diary_id}`} className="w-full flex flex-row h-24 md:h-28 lg:h-36 xl:h-48 border-b border-gray max-w-5xl">
      <img src={Url(`/img/stream_photo/${data.thumbnail}`)} className="h-full aspect-video object-cover p-2" />
      <div className="h-full w-12 flex-auto flex flex-col justify-start px-2 pt-2">
        <h3 className="text-lg sm:text-xl lg:text-xl text-tcolor line-clamp-2">{data.title}</h3>
        <h3 className="text-md sm:text-xl lg:text-xl text-tcolor">{data.date}</h3>
      </div>
    </Link>
  )
};

export default Diary;