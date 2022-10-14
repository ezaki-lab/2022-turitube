import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import React from 'react';
import { Outlet } from "react-router-dom";
import CloseButton from "../../img/buttons/close.png";


const ExplainModal = () => {
  const [explainModalInfo, setExplainModalInfo] = useRecoilState(atom.explain_modal_info);

  const closeModal = () => {
    setExplainModalInfo({
      title: "",
      text: "",
      caption: "",
      is_open: false
    });
  }

  return (
    <>
      <div className={`h-full w-full bg-black bg-opacity-40 flex justify-center items-center fixed z-99999 ${explainModalInfo.is_open ? "" : "hidden"}`}>
        <div className={`rounded-2xl bg-white flex flex-col items-start pb-4 animate-fadein`}>
          <div className="h-14 bg-basic w-full rounded-t-2xl px-8 flex justify-center items-center ">
            <h2 className="text-2xl font-bold text-white">{explainModalInfo.title}</h2>
          </div>

          <p className="pt-4 text-lg font-bold text-tcolor px-4">{explainModalInfo.text}</p>
          <p className="py-2 text-md text-tcolor px-4">{explainModalInfo.caption}</p>
          <button className="w-full flex justify-center pt-4 active:animate-button-push" onClick={() => { closeModal(); }}>
            <img src={CloseButton} className="h-12" />
          </button>

        </div>
      </div>
      <Outlet />
    </>
  )
}

const Example = () => {
  const [explainModalInfo, setExplainModalInfo] = useRecoilState(atom.explain_modal_info);

  const explain = () => {
    console.log("a")
    setExplainModalInfo({
      title: "あいうえお",
      text: "おおお",
      caption: null,
      is_open: true,
    })
  };

  return (
    <>
      <input type="checkbox" id="explain-modal" className="modal-toggle" onClick={() => { console.log("ati") }} />
      <label htmlFor="explain-modal" className="btn modal-button" onClick={() => { explain() }}>open modal</label>
    </>
  )
}

export default ExplainModal;