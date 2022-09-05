/*  Book/index */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Unregistered from "../../../img/icons/unregistered.png";
import kariImg from "../../../img/kari3.png";
import Layout from "./layout";
import Infomation from "./diary_info";
import Timeline from "./timeline"

// 図鑑のメイン部分
const DiaryContent = () => {
  const id = "13";
  const name = "タケノコメバルを釣りました!";
  const [index, useIndex] = useState(0)
  

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center pt-2">
          <img src={kariImg} className="rounded-xl my-2" />
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