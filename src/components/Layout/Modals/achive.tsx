import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import ProgressBar from '../../ProgressBar';
import Title from '../../Title';
import CloseButton from "../../../img/buttons/close.png";
import useWindowSize from '../../../hooks/useWindowSize';
import useGetItems from '../../../hooks/useGetItems';
import axios from 'axios';
import Url from '../../../utils/url';

// 実績モーダル
const AchiveComponent = ({ enable = true, setModalId = null }) => {
  const [tab, setTab] = useState<number>(1);

  const received_data = [
    {
      text: "魚を初めて釣り上げる",
      id: 1,
      reword: "100xp 20pt"
    },
    {
      text: "初めて配信をする",
      id: 2,
      reword: "100xp 20pt"
    },
    {
      text: "初めて配信を視聴する",
      id: 3,
      reword: "100xp 20pt"
    },
    {
      text: "初めて配信のホストになる",
      id: 4,
      reword: "100xp 20pt"
    },
    {
      text: "5匹釣り上げる",
      id: 5,
      reword: "200xp 20pt"
    },
    {
      text: "5匹釣り上げる",
      id: 6,
      reword: "200xp 20pt"
    },
    {
      text: "5匹釣り上げる",
      id: 7,
      reword: "200xp 20pt"
    },
    {
      text: "5匹釣り上げる",
      id: 8,
      reword: "200xp 20pt"
    },
  ]

  return (
    <>
      <div className={`mx-4 h-full w-full max-w-4xl bg-white drop-shadow-2xl rounded-2xl flex flex-col ${!enable ? "animate-fadein" : ""}`}>

        <div className="w-full max-w-4xl rounded-md flex flex-row items-center justify-center pt-2">
          <button className="border border-gray-dark rounded-l-md" onClick={() => { setTab(0) }}>
            <h3 className={tab == 0 ? "text-white bg-basic border-white font-bold text-xs lg:text-sm border-[3px] rounded-l-md px-4 py-1" : "text-tcolor bg-white border-gray font-bold text-xs lg:text-sm border-2 rounded-l-md px-4 py-1"}>実績の進捗</h3>
          </button>
          <button className="border-y border-r border-gray-dark rounded-r-md" onClick={() => { setTab(1) }}>
            <h3 className={tab == 1 ? "text-white bg-basic border-white font-bold text-xs lg:text-sm border-[3px] rounded-r-md px-4 py-1" : "text-tcolor bg-white border-gray font-bold text-xs lg:text-sm border-2 rounded-r-md px-4 py-1"}>所有済みの称号</h3>
          </button>
        </div>

        <div className="h-20 flex-auto mx-4 my-1 mb-4 flex sm-max:flex-col sm:flex-row rounded-2xl drop-shadow-2xl bg-white border-gray">
          {tab == 0 ? <Progress /> : <></>}
          {tab == 1 ? <TitleList /> : <></>}
        </div>

        {!enable
          ? <button className="pb-4 w-full flex justify-center active:animate-button-push" onClick={() => { setModalId(null) }}>
            <img src={CloseButton} className="w-24" />
          </button>
          : <></>}
      </div>
    </>
  );
};

const Progress = () => {
  const [data, setData] = useState({});
  const [userId, setUserId] = useRecoilState(atom.user_id);

  useEffect(() => {
    axios.get(Url("/achive"), {
      params:{
        user_id: userId
      }
    }).then((res) => {
      setData(res.data)
    })
  }, []);

  const [explainModalInfo, setExplainModalInfo] = useRecoilState(atom.explain_modal_info);

  const openModal = (text, reword) => {
    setExplainModalInfo({
      title: "受注クエストの詳細",
      text: text,
      caption: "報酬 " + reword,
      is_open: true,
    });
  }

  return (
    <>
      <ul className="h-full w-full flex-auto overflow-y-auto flex flex-col p-3 space-y-2 pb-40">
        {Object.keys(data).map((key, index) => {

          return (
            <li className="border border-b-2 border-gray rounded-lg h-16 w-full flex items-center pl-2" key={index}>
              <button className="my-auto h-16 w-full flex flex-col justify-center" onClick={() => { openModal(data[key].title, data[key].rewords_text.join(' ')) }}>
                <p className="text-tcolor text-sm text-lg truncate w-full text-left">{data[key].title}</p>
                <ProgressBar value={data[key].progress} max={data[key].max_progress} color="tcolor" />
              </button>

            </li>
          )
        })}
      </ul>
    </>
  )
}

const TitleList = () => {
  const [width, height] = useWindowSize();
  const titles = useGetItems("title");

  return (
    <>
      <div className="w-full h-full items-center overflow-y-auto flex flex-col p-3 pb-40">
        <div className="flex flex-wrap items-start justify-center w-full">
          {titles.map((v, i) => {
            return (
              <div className="w-28 sm:w-48 h-12 px-1 py-2 flex flex-col justify-center items-center" key={i}>
                <Title title_id={v.item_id} scale={width<640 ? "mini" : "normal"} />
              </div>
            )
          })}

        </div>
      </div>
    </>
  )

}

export default AchiveComponent;