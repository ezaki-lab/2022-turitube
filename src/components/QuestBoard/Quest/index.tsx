import React, { useState, useEffect } from "react";
import ProgressBar from "../progressBar";
import StickyNote from "../stickyNote";
import QuestFishActiveAqua from '../../../img/icons/quest_fish_aqua.active.png';
import QuestFishInactiveAqua from '../../../img/icons/quest_fish_aqua.inactive.png';
import { useRecoilState } from 'recoil';
import * as atom from '../../../common/atom';
import axios from "axios";

interface QuestInfo {
  title: string,
  purpose: string,
  progress: number,
  max_progress: number,
  rewords: string[],
  rewords_text: string[],
  id: number
}

var COLOR = "basic";

//クエストボードのうちクエストに分類されるもの
const Quest = ({ place, can_order_quest }) => {
  const [quests, setQuests] = useState<QuestInfo[]>();
  const [questInfo, setQuestInfo] = useState<QuestInfo>();
  const [order, setOrder] = useState<number>(null); //受注中のクエストID
  const [selectId, setSelectId] = useState<number | null>(null);
  const [userInfo] = useRecoilState(atom.user_info);
  const base_url = "https://ezaki-lab.cloud/~turitube/api/quest";
  const [ready, setReady] = useState<boolean>(false);

  // クエスト内容の受け取り
  useEffect(() => {
    axios.get(base_url, {
      params: {
        user_id: userInfo.user_id
      }
    })
      .then((res) => {
        setQuests(res.data.quests);
        setOrder(res.data.ordered_quest_id);
        setSelectId(1);
      })
  }, []);

  // ready?
  useEffect(() => {
    if (quests) {
      setReady(true);
    }
  }, [quests]);

  // 選択されたクエストに応じた処理
  useEffect(() => {
    if (selectId) {
      quests.map((quest, index) => {
        if (selectId == quest.id) {
          setQuestInfo(quest);
        }
      });
    }
  }, [selectId]);

  const order_set = (quest_id) => {
    if (can_order_quest) {
      axios.put(base_url, {
        user_id: userInfo.user_id,
        quest_id: quest_id
      });
      setOrder(quest_id);
    }
  }

  if (!ready) return (<></>)


  return (
    <div className={`h-80 flex-auto w-full flex flex-col bg-background rounded-b-lg sm:flex-row sm:h-3/5 sm:pb-6 ${place !== "quest" ? "hidden" : ""}`}>
      <QuestInfo questInfo={questInfo} func={order_set} can_order_quest={false} />

      <div className="h-16 flex-auto mx-3 sm:h-full my-3">
        <ul className="h-full max-h-full overflow-y-scroll flex flex-col items-center">
          {quests.map((quest, index) => (
            <button className="w-full" key={quest.id} onClick={() => setSelectId(quest.id)}>
              <QuestSelection quest={quest} selected={quest.id == selectId} order={order} />
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
}

const QuestInfo = ({ questInfo, func, can_order_quest=true }) => {
  return (
    <div className="bg-white rounded-2xl h-48 my-3 mx-3 sm:ml-3 sm:w-72 sm:h-full">
      <div className="flex justify-center">
        <h1 className={`text-${COLOR} font-bold text-xl my-1`}>{questInfo.title}</h1>
      </div>

      <StickyNote text="目的" color={COLOR} />
      <h1 className={`text-${COLOR} font-bold text-sm ml-4 mt-1`}>{questInfo.purpose}</h1>
      <div className="px-4">
        <ProgressBar value={questInfo.progress} max={questInfo.max_progress} color={COLOR} />
      </div>

      <StickyNote text="報酬" color={COLOR} />
      <div className="flex flex-row">
        {questInfo.rewords_text.map((reword, index) => (
          <h1 className={`text-${COLOR} font-bold text-sm ml-4 mt-1`} key={index}>{reword}</h1>
        ))}
      </div>
      
      {can_order_quest ? 
      <button className="btn" onClick={() => { func(questInfo.id) }}>このクエストを受ける</button> : 
      <button className="btn">配信中は選べません</button>}
      
    </div>
  )
}


const QuestSelection = ({ quest, selected, order }) => {
  return (
    <li className={`my-1 px-2 bg-${selected ? COLOR : "white"} rounded-xl w-full h-16 flex-none flex flex-row items-center`}>
      <img src={selected ? QuestFishActiveAqua : QuestFishInactiveAqua} className="w-7 aspect-square rounded-full" />
      <div className="flex flex-col px-1 w-20 flex-auto">
        <h3 className={`text-md text-left font-bold text-${selected ? "white" : COLOR}`}>{quest.title}{quest.id==order ? "これ受け中" : ""}</h3>
      </div>
    </li>
  )
}

export default Quest;