import React from 'react';
import Url from '../../../utils/url';

// 日誌 - index
const DiaryCarousel = ({ imgList }) => {

  return (
    <>
      <div className="carousel carousel-center h-20 flex-auto space-x-4 max-w-5xl">
        {imgList.map((v, i) => {
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


export default DiaryCarousel;