import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import Kari1 from "../../../img/kari.jpg";
import Kari2 from "../../../img/kari2.png";

// 日誌 - index
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


export default DiaryCarousel;