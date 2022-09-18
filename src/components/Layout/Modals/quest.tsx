import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import Item from '../../../components/Item';
import CloseButton from "../../../img/buttons/close.png";

// クエストモーダル - index
const QuestComponent = ({ enable = true, setModalId = null }) => {
  const [target, setTarget] = useState<number>(0);

  const quest = [
    {
      title: "めでたい日",
      id: 1,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      },
      {
        id: 2,
        amount: 100
      },
      {
        id: 1,
        amount: 100
      },
      {
        id: 1,
        amount: 100
      },
      ],
      reword: "100xp 20pt",
      content: "タイを1匹釣り上げる"
    },
    {
      title: "初めて配信をする",
      id: 2,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      }],
      reword: "100xp 20pt",
      content: "魚を初めて釣り上げる"
    },
    {
      title: "初めて配信を視聴する",
      id: 3,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      }],
      reword: "100xp 20pt",
      content: "魚を初めて釣り上げる"
    },
    {
      title: "初めて配信のホストになる",
      id: 4,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      }],
      reword: "100xp 20pt",
      content: "魚を初めて釣り上げる"
    },
    {
      title: "5匹釣り上げる",
      id: 5,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      }],
      reword: "200xp 20pt",
      content: "魚を初めて釣り上げる"
    },
    {
      title: "5匹釣り上げる",
      id: 6,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      }],
      reword: "200xp 20pt",
      content: "魚を初めて釣り上げる"
    },
    {
      title: "5匹釣り上げる",
      id: 7,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      }],
      reword: "200xp 20pt",
      content: "魚を初めて釣り上げる"
    },
    {
      title: "5匹釣り上げる",
      id: 8,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      }],
      reword: "200xp 20pt",
      content: "魚を初めて釣り上げる"
    },
    {
      title: "5匹釣り上げる",
      id: 9,
      items: [{
        id: 0,
        amount: 200
      },
      {
        id: 1,
        amount: 100
      }],
      reword: "200xp 20pt",
      content: "魚を初めて釣り上げる"
    },
  ]

  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <div className={`mx-4 mt-4 h-full w-full bg-white drop-shadow-2xl rounded-2xl flex flex-col  ${!enable ? "animate-fadein" : ""}`}>
        <div className="w-full h-20 flex-auto flex flex-col sm:flex-row">
          <div className="sm-max:h-64 sm-max:w-full sm:w-80 sm:flex-auto p-3">
            <div className="rounded-xl w-full h-full p-2 overflow-y-auto shadow-lg">
              <h2 className="text-center text-tcolor font-bold text-2xl">{quest[target].title}</h2>
              <StickyNote text="内容" />
              <p className="text-tcolor text-lg pb-3 truncate">{quest[target].content}</p>
              <StickyNote text="報酬" />
              <div className="pt-2 w-full flex flex-row justify-start flex-wrap">
                {quest[target].items.map((value, index) => (
                  <div className="w-16 mx-1" key={index}>
                    <Item item_id={value.id} size={16} caption={true} text={value.amount} textsize="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ul className="sm-max:h-20 sm-max:w-full flex-auto h-8 sm:h-full overflow-y-auto sm-max:pb-44 flex flex-col space-y-2 px-3 sm:pt-3">
            {quest.map((data, index) => {
              return (
                <button key={index} className={`border-${target != index ? "gray border border-b-[3px]" : "basic border-2"} py-3 rounded-xl w-full flex items-center pl-2`} onClick={() => { setTarget(index) }}>
                  <p className={`text-${target != index ? "tcolor" : "basic"} text-sm sm:text-md font-bold truncate`}>{data.title}</p>
                </button>
              )
            })}
          </ul>
        </div>


        {!enable
          ? <button className="py-2 w-full flex justify-center active:animate-button-push" onClick={() => { setModalId(null) }}>
            <img src={CloseButton} className="h-12" />
          </button>
          : <></>}
      </div>
    </>
  );
};

const StickyNote = ({ text }) => {
  return (
    <div className={`bg-basic w-16 h-5 -ml-2 flex flex-row`}>
      <div className={`bg-basic w-12 h-full flex items-center justify-end`}>
        <h1 className={`text-white text-sm font-bold mr-2`}>{text}</h1>
      </div>
      <div className={`bg-basic-dark w-4 h-full`} />
    </div>
  )
}

export default QuestComponent;