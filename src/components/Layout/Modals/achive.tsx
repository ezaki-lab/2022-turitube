import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import ProgressBar from '../../ProgressBar';
import Title from '../../Title';
import CloseButton from "../../../img/buttons/close.png";

// 実績モーダル
const AchiveComponent = ({ enable = true, setModalId = null }) => {
  const [tab, setTab] = useState<number>(0);

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

  const titles = [
    {
      text: "釣り初心者",
      background: "lv1",
      caption: "初めて図鑑に登録する"
    },
    {
      text: "配信初心者",
      background: "lv1",
      caption: "初めて配信する"
    },
    {
      text: "タイ好き",
      background: "lv2",
      caption: "タイを5匹釣り上げる"
    },
    {
      text: "アジ好き",
      background: "lv2",
      caption: "アジを5匹釣り上げる"
    },
    {
      text: "カサゴ好き",
      background: "lv2",
      caption: "カサゴを5匹釣り上げる"
    },
    {
      text: "釣りベテラン",
      background: "lv3",
      caption: "魚を30匹釣り上げる"
    },
    {
      text: "配信ベテラン",
      background: "lv3",
      caption: "配信を20時間行う"
    },
    {
      text: "釣りマスター",
      background: "lv4",
      caption: "魚を200匹釣り上げる"
    },
    {
      text: "配信マスター",
      background: "lv4",
      caption: "配信を50時間行う"
    },
    {
      text: "釣りちゅーばー",
      background: "basic",
      caption: "釣りちゅーぶへようこそ！"
    },
  ]

  useEffect(() => {
    ;
  }, []);

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
          {tab == 0 ? <Progress data={received_data} /> : <></>}
          {tab == 1 ? <TitleList data={titles} /> : <></>}
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

const Progress = ({ data }) => {
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
        {data.map((d, index) => {
          return (
            <li className="border border-b-2 border-gray rounded-lg h-16 w-full flex items-center pl-2" key={d.id}>
              <button className="my-auto h-16 w-full flex flex-col justify-center" onClick={() => { openModal(d.text, d.reword) }}>
                <p className="text-tcolor text-sm text-lg truncate w-full text-left">{d.text}</p>
                <ProgressBar value="1" max="5" color="tcolor" />
              </button>

            </li>
          )
        })}
      </ul>
    </>
  )
}

const TitleList = ({ data }) => {
  const [explainModalInfo, setExplainModalInfo] = useRecoilState(atom.explain_modal_info);

  const openModal = (text, caption) => {
    setExplainModalInfo({
      title: "称号の詳細",
      text: text,
      caption: "入手条件: " + caption,
      is_open: true,
    });
  }

  return (
    <>
      <div className="w-full h-full items-center overflow-y-auto flex flex-col p-3 pb-40">
        <div className="flex flex-wrap items-start justify-center w-full">
          {data.map((v, i) => {
            return (
              <button className="w-28 sm:w-48 h-12 px-1 py-2 flex flex-col justify-center items-center" onClick={() => { openModal(v.text, v.caption) }} key={v.text}>
                <Title text={v.text} bgcolor={v.background} textcolor="white" w="full" h="" textsize={"xxs"} />
              </button>
            )
          })}

        </div>
      </div>
    </>
  )

}

export default AchiveComponent;