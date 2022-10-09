import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import TitleHeader from '../../components/TitleHeader';
import { Link } from 'react-router-dom';
import Kari4 from "../../img/kari4.png";
import Kari6 from "../../img/kari6.jpg";
import Kari7 from "../../img/kari7.jpg";
import Kari8 from "../../img/kari8.png";
import Kari9 from "../../img/kari9.png";
import Kari10 from "../../img/kari10.png";

// 日誌 - index
const Diary = () => {

  const data = [
    {
      img: Kari4,
      title: "小坂の釣り配信！",
      date: "2022/02/08"
    },
    {
      img: Kari6,
      title: "サバ狙い！たくさん釣れました！",
      date: "2022/03/02"
    },
    {
      img: Kari7,
      title: "ベラってすごい色してるよね",
      date: "2022/05/04"
    },
    {
      img: Kari8,
      title: "鳥羽で釣りしました",
      date: "2022/06/10"
    },
    {
      img: Kari9,
      title: "友達誘って釣りちゅーぶ",
      date: "2022/06/12"
    },
    {
      img: Kari10,
      title: "タイを釣ってきたぜ",
      date: "2022/10/04"
    }
  ]

  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <TitleHeader title="日誌" />
      <div className="h-full w-full flex flex-col items-center pt-16 sm:pb-16 sm-max:pb-60 overflow-y-auto">
        {data.map((v, i) => {
          return (<Content data={v} key={i} />)
        })}
      </div>
    </>
  );
};

const Content = ({data}) => {
  return (
    <Link to="/diary/1234567890" className="w-full flex flex-row h-24 md:h-28 lg:h-36 xl:h-48 border-b border-gray max-w-5xl">
      <img src={data.img} className="h-full aspect-video object-cover p-2" />
      <div className="h-full w-12 flex-auto flex flex-col justify-start px-2 pt-2">
        <h3 className="text-lg sm:text-xl lg:text-xl text-tcolor line-clamp-2">{data.title}</h3>
        <h3 className="text-md sm:text-xl lg:text-xl text-tcolor">{data.date}</h3>
      </div>
    </Link>
  )
};

export default Diary;