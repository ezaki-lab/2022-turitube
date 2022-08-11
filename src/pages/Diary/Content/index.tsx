/*  Book/index */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Unregistered from "../../../img/icons/unregistered.png";
import Layout from "./layout";
import Infomation from "./diary_info";
import Timeline from "./timeline"

// 図鑑のメイン部分
const DiaryContent = () => {
  const id = "13";
  const name = "アジを大量に釣る金曜日";
  const [index, useIndex] = useState(0)
  

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center pt-2">
          <img src="https://static.chunichi.co.jp/image/article/size1/4/f/e/4/4fe4a4f3da4082c85e30a3ed10f5e70a_1.jpg" className="rounded-xl my-2" />
          <div className="flex flex-row flex-wrap justify-center w-full pb-5">
            <div className="text-md font-bold text-white rounded-full bg-basic h-8 w-8 leading-8 text-center mx-1">1</div>
            <div className="text-md font-bold text-white rounded-full bg-basic h-8 w-8 leading-8 text-center mx-1">2</div>
            <div className="text-md font-bold text-white rounded-full bg-basic h-8 w-8 leading-8 text-center mx-1">3</div>
          </div>
          <h1 className="text-xl font-bold">{name}</h1>
        </div>

        <Infomation />
        <Timeline index={index} />
      </Layout>
    </>
  )
};

export default DiaryContent;