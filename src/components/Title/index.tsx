import React from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

const titles = {
  "000": {
    text: "釣りちゅーばー",
    background: "achive-000",
    caption: "釣りちゅーぶへようこそ！"
  },
  "001": {
    text: "称号001",
    background: "achive-001",
    caption: "称号001の説明"
  },
  "002": {
    text: "称号002",
    background: "achive-002",
    caption: "称号002の説明"
  },
  "003": {
    text: "称号003",
    background: "achive-003",
    caption: "称号003の説明"
  },
  "004": {
    text: "称号004",
    background: "achive-004",
    caption: "称号004の説明"
  },
  "005": {
    text: "称号005",
    background: "achive-005",
    caption: "称号005の説明"
  },
  "006": {
    text: "称号006",
    background: "achive-006",
    caption: "称号006の説明"
  },
  "007": {
    text: "称号007",
    background: "achive-007",
    caption: "称号007の説明"
  },
  "008": {
    text: "称号008",
    background: "achive-008",
    caption: "称号008の説明"
  },
  "009": {
    text: "称号009",
    background: "achive-009",
    caption: "称号009の説明"
  },
}

// 称号表示
const Title = ({ title_id, scale = "normal", explain=true }) => {
  const [explainModalInfo, setExplainModalInfo] = useRecoilState(atom.explain_modal_info);
  const data = titles[title_id]
  const h = scale=="normal" ? "8" : scale=="mini" ? "6" : "10"
  const w = scale=="normal" ? "32" : scale=="mini" ? "24" : "40"
  const text_size = scale=="normal" ? "sm" : scale=="mini" ? "xxs" : "md"

  const openModal = () => {
    if (explain) setExplainModalInfo({
      title: "称号の詳細",
      text: data.text,
      caption: "入手条件: " + data.caption,
      is_open: true,
    });
  }

  return (
    <>
      <div className="bg-achive-000 bg-achive-001 bg-achive-002 bg-achive-003 bg-achive-004 bg-achive-005 bg-achive-006 bg-achive-007 bg-achive-008 bg-achive-009 bg-achive-010 bg-achive-011 bg-achive-012 bg-achive-013 bg-achive-014 bg-achive-015 bg-achive-016 bg-achive-017 bg-achive-018 bg-achive-019 bg-achive-020"></div>
      <div className={`border-gray-dark border rounded-full h-${h} w-${w}`} onClick={() => {openModal()}}>
        <div className={`bg-${data.background} h-full border-2 border-white rounded-full flex items-center justify-around`}>
          <p className={`text-white font-bold text-${text_size} drop-shadow-xl`}>{data.text}</p>
        </div>
      </div>

    </>
  );
};

export default Title;