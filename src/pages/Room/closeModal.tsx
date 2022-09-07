import React, { useState, useRef, useEffect } from 'react';

// 配信中設定モーダル
const CloseModal = ({ myStream, leaveRoom }) => {
  return (
    <>
      <input type="checkbox" id="close-modal" className="modal-toggle" />
      <div className="modal w-screen">
        <div className="modal-box w-3/4 max-w-6xl">
          <label htmlFor="close-modal" className="btn btn-md btn-circle bg-basic text-xl font-bold border-basic absolute right-2 top-2">✕</label>
          <h2 className="text-xl font-bold text-basic pb-4">配信から退出</h2>
          <ModalText text={"配信から退出しますか？"}/>
          {myStream.is_host 
          ? <>
            <ModalText text={"あなたは配信のホストです！退出すると全員終了します！"} textColor="text-red-400" />
          </>
          :<></>}

          <div className="flex justify-end mt-4">
            <button className="btn btn-active border-basic text-white bg-basic tracking-wide" onClick={leaveRoom}>配信を閉じる</button>
          </div>
        </div>
      </div>
    </>
  )
}

const ModalText = ({ text, textColor="" }) => {
  return (
    <p className={`font-bold py-1 ${textColor}`}>{text}</p>
  )
}

const ModalTitle = ({ text }) => {
  return (
    <h2 className="py-4 font-bold text-md items-center">{text}</h2>
  )
}

export default CloseModal;