import React, { useState } from 'react';
import Title from "../../components/Title";

const History = () => {
    const images = [
        {
          "url": "https://www.zukan-bouz.com/public_image/Fish/111/Thumb630/takabe.jpg",
          "type": "アジ",
          "date": "2022.6.28"
        },
        {
          "url": "https://www.zukan-bouz.com/public_image/Fish/1295/Thumb630/bakeakamutu_1.jpg",
          "type": "バケアカムツ",
          "date": "2022.6.28"
        },
        {
          "url": "https://www.zukan-bouz.com/public_image/Fish/111/Thumb630/takabe.jpg",
          "type": "アジ",
          "date": "2022.6.28"
        },
        {
          "url": "https://www.zukan-bouz.com/public_image/Fish/111/Thumb630/takabe.jpg",
          "type": "アジ",
          "date": "2022.6.28"
        },
        {
          "url": "https://www.zukan-bouz.com/public_image/Fish/111/Thumb630/takabe.jpg",
          "type": "アジ",
          "date": "2022.6.28"
        },
        {
          "url": "https://www.zukan-bouz.com/public_image/Fish/111/Thumb630/takabe.jpg",
          "type": "アジ",
          "date": "2022.6.28"
        },
        {
          "url": "https://www.zukan-bouz.com/public_image/Fish/111/Thumb630/takabe.jpg",
          "type": "アジ",
          "date": "2022.6.28"
        },
      ]
    
      return (
        <>
          <div className="h-52 bg-white flex flex-col">
            <div className="h-12 flex flex-row content-around w-full items-center">
              <Title title="最近釣った魚" />
              <h2 className="mr-2">全て表示?</h2>
            </div>
            <div className="w-full h-40 border-b-2">
              <div className="flex h-full overflow-x-scroll">
                {images.map((data, index) => (
                  <Card key={index} url={data.url} type={data.type} date={data.date} />
                ))}
              </div>
            </div>
    
          </div>
        </>
      )
    }
    
    const Card = ({ url, type, date }) => {
      return (
        <>
          <div className="flex-none w-36 ml-4 h-full">
              <img src={url} className="w-44 aspect-video"/>
              <p>{type}</p>
              <p className="text-xs">{date}</p>
          </div>
    
        </>
      )
}

export default History;