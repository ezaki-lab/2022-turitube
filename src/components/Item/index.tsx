import React from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import Item0 from "../../img/items/item0.png";
import Item900 from "../../img/items/item900.png";
import Item901 from "../../img/items/item901.png";

const items = {
  "900": {
    name: "経験値",
    content: "レベルアップに必要。様々なシチュエーションで手に入る。",
    image: Item900,
  },
  "901": {
    name: "ポイント",
    content: "各種アイテムの購入に必要",
    image: Item901,
  }
}

const Item = ({ item_id="900", size = 8, caption = false, text=null, textsize="xxs" }) => {
  const [explainModalInfo, setExplainModalInfo] = useRecoilState(atom.explain_modal_info);
  const item = items[item_id];

  const openModal = (text, caption) => {
    setExplainModalInfo({
      title: "アイテムの詳細",
      text: text,
      caption: caption,
      is_open: true,
    });
  }

  return (
    <>
    <div className={`w-${size} flex flex-col justify-center items-center`}>
      <button className={`rounded-md w-full h-${size} flex justify-center items-center border-2 border-basic`} onClick={() => { openModal(item.name, item.content) }}>
        <img src={item.image} className="w-5/6 h-5/6" />
      </button>
      {caption ? <p className={`text-${textsize} text-basic font-bold`}>{text}</p> : <></>}
    </div>
      
    </>
  )
}

export default Item;