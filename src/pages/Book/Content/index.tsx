/*  Book/index */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Layout from "./layout";
import Unregistered from "../../../img/icons/unregistered.png";
import kariImg from "../../../img/kari4.png";
import Infomation from "./fish_info";
import Timeline from "./timeline";

// 図鑑のメイン部分
const BookContent = () => {
  const id = "13";
  const name = "たけのこメバル";
  const [index, useIndex] = useState(0)
  const datas = [
    {
      img: Unregistered,
      size: 15,
      position: "フェリー乗り場付近",
      date: "2022-05-21",
      background: [
        {
          time: "17:30",
          do: "釣り開始"
        },
        {
          time: "17:38",
          do: "糸を垂らす"
        },
        {
          time: "17:54",
          do: "釣り竿に反応"
        },
        {
          time: "17:56",
          do: "ゲット"
        },
        {
          time: "19:43",
          do: "釣り終了"
        }
      ]
    }
  ]

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center pt-2">
          {/*<img src={Unregistered} className="rounded-xl my-2" />*/}
          <img src={kariImg} className="rounded-xl my-2" />
          <div className="flex flex-row flex-wrap justify-center w-full pb-5 border-b-2 border-basic">
            <div className="text-md font-bold text-white rounded-full bg-basic h-8 w-8 leading-8 text-center mx-1">1</div>
            <div className="text-md font-bold text-white rounded-full bg-basic h-8 w-8 leading-8 text-center mx-1">2</div>
            <div className="text-md font-bold text-white rounded-full bg-basic h-8 w-8 leading-8 text-center mx-1">3</div>
          </div>
          <h1 className="text-2xl pt-3">{("000" + id).slice(-3)}  {name}</h1>
        </div>

        <Infomation datas={datas} index={index} />
        <Timeline datas={datas} index={index} />

      </Layout>

    </>
  )
};

export default BookContent;