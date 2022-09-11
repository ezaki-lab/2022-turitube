/* アバター描画コンポーネント*/
import React, { useState, useEffect } from 'react';
import Quest from './Quest';
import Achive from './Achive';
import axios from 'axios';

interface QuestInfo {
  title: string,
  purpose: string,
  progress: number,
  max_progress: number,
  rewords: string[],
  rewords_text: string[],
  id: number
}

const QuestBoard = ({ can_order_quest }) => {
  const [place, setPlace] = useState<string>("quest");
  const [color, setColor] = useState<string>("basic");

  useEffect(() => {
    switch(place) {
      case "quest": setColor("basic"); return;
      case "achive": setColor("sub"); return;
    }
  }, [place]);

  return (
    <>
      {/*見えない空要素でカラーを読み込ませる */}
      <div className="hidden border-basic border-sub border-white bg-basic bg-basic-dark bg-sub-dark bg-sub" />
      <input type="checkbox" id="questboard-modal" className="modal-toggle" />

      <div className="modal h-full w-full p-5 items-center justify-center flex">
        <div className="w-4/5 h-full flex flex-col sm:w-4/5 md:w-4/5 lg:w-3/5">
          <div className={`w-full h-16 bg-${color} flex items-center justify-center rounded-t-lg relative`}>
            <h1 className="text-white font-bold text-xl sm:text-2xl">{place=="quest" ? "クエストの選択" : "実績"}</h1>
            <label htmlFor="questboard-modal" className="absolute text-3xl font-bold text-white right-4 cursor-pointer">✕</label>
          </div>

          <div className="w-full h-14 flex flex-row items-center justify-center bg-background pt-2 ">
            <div className={`w-32 h-full flex items-center justify-center mx-2 border-b-4 border-${color=="basic" ? "basic" : "white"}`}>
              <button className="text-basic font-bold text-md sm:text-xl" onClick={() => { setPlace("quest") }}>クエスト</button>
            </div>
            <div className={`w-32 h-full flex items-center justify-center mx-2 border-b-4 border-${color=="sub" ? "sub" : "white"}`}>
              <button className={`text-sub font-bold text-md sm:text-xl`} onClick={() => { setPlace("achive") }}>実績</button>
            </div>
          </div>
          
          <Quest place={place} can_order_quest={can_order_quest} />
          <Achive place={place} />
        </div>
      </div>

    </>
  )
}

export default QuestBoard;