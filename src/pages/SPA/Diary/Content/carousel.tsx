import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';


// 日誌 - index
const DiaryCarousel = () => {
  // 本来は引数で受け取る
  const data = [
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    },
    {
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
    },


  ];

  return (
    <>
      <div className="carousel carousel-center h-20 flex-auto space-x-4 max-w-5xl">
        {data.map((v, i) => {
          return (
            <div id={`item${i}`} className="carousel-item h-full aspect-video max-w-[80%] rounded-xl bg-gray mx-auto" key={i}>
              <img src={v.image} className="h-full w-full object-cover rounded-xl" />
            </div>
          )
        })}
      </div>
      <div className="flex justify-center w-full max-w-5xl h-10">
        <div className="flex flex-row justify-start py-2 gap-2 overflow-x-auto pl-1">
          {data.map((v, i) => {
            return (
              <a href={`#item${i}`} className="btn btn-xs flex-none bg-gray-dark hover:bg-gray-dark" key={i}>{i + 1}</a>
            )
          })}
        </div>
      </div>

    </>
  )
};


export default DiaryCarousel;