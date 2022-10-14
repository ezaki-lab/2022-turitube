import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import Item from '../../../components/Item';
import CloseButton from "../../../img/buttons/close.png";
import axios from 'axios';
import Url from '../../../utils/url';
import ProgressBar from '../../ProgressBar';
import Ordered from "../../../img/icons/ordered.png";
import OrderButton from "../../../img/buttons/order.png";

// クエストモーダル - index
const QuestComponent = ({ enable = true, setModalId = null }) => {
  const [target, setTarget] = useState<string | null>("001");
  const [quest, setQuest] = useState(null);
  const [order, setOrder] = useState(null);
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(Url("/quest"), {
      params: {
        user_id: userId
      }
    }).then((res) => {
      setQuest(res.data.quests);
      setOrder(res.data.ordered_quest_id);
    })
  }, []);

  useEffect(() => {
    if (quest) {
      setLoading(false);
    }
  }, [quest]);

  const Order = () => {
    axios.put(Url("/quest"), {
      user_id: userId,
      quest_id: target
    }).then((res) => {
      if (res.data.status) setOrder(target);
    })
  }

  if (loading) return <></>
  return (
    <>
      <div className={`mx-4  h-full w-full bg-white drop-shadow-2xl rounded-2xl flex flex-col  ${!enable ? "animate-fadein" : ""}`}>
        <div className="w-full h-20 flex-auto flex flex-col sm:flex-row">
          <div className="sm-max:h-80 sm-max:w-full sm:w-80 sm:flex-auto sm:h-full p-3 relative">
            <div className="rounded-xl w-full h-full p-2 overflow-y-auto shadow-lg">
              <h2 className="text-center text-tcolor font-bold text-xl">{quest[target].title}</h2>
              <StickyNote text="内容" />
              <p className="text-tcolor text-lg truncate">{quest[target].content}</p>
              <ProgressBar value={quest[target].progress} max={quest[target].max_progress} color="tcolor" />
              <div className="pb-2" />
              <StickyNote text="報酬" />
              <div className="flex w-full">
                <div className="pt-2 flex-auto flex flex-row justify-start flex-wrap">
                  {!loading ? quest[target].items.map((value, index) => (
                    <div className="w-12 mx-1" key={index}>
                      <Item item_id={value.id} size={12} caption={true} text={value.amount} textsize="sm" />
                    </div>
                  )) : <></>}
                </div>
                {order != target
                  ? <div className="w-28 flex justify-end">
                    <button onClick={Order}>
                      <img src={OrderButton} className="w-28" />
                    </button>
                  </div>
                  : <></>}
              </div>

            </div>
            {order == target ? <img src={Ordered} className={`top-0 right-0 absolute w-24 h-24 animate-stamp`} /> : <></>}
          </div>
          <ul className="sm-max:h-20 sm-max:w-full flex-auto h-8 sm:h-full overflow-y-auto flex flex-col space-y-2 px-3 sm:pt-3">
            {Object.keys(quest).map((key, index) => {
              return (
                <button key={index} className={`border-${target != key ? "gray border border-b-[3px]" : "basic border-2 animate-selected"} py-3 rounded-xl w-full flex items-center pl-2 relative`} onClick={() => { setTarget(key) }}>
                  <p className={`text-${target != key ? "tcolor" : "basic"} text-sm sm:text-sm font-bold truncate`}>{quest[key].title}</p>
                  {order == key ? <img src={Ordered} className="absolute right-0 w-12 h-12" /> : <></>}
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