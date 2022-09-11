import React, { useState, useRef, useEffect } from 'react';
import useCamera from '../../../hooks/useCamera';

// 配信中設定モーダル
const SettingModal = ({ cam, localStream, readyCam }) => {
 const videoRef = useRef<HTMLVideoElement>();

 useEffect(() => {
  if(readyCam) {
      videoRef.current!.srcObject = localStream.current;
      videoRef.current.play().catch((e) => console.log(e));
  }
}, [readyCam]);

  return (
    <>
      <input type="checkbox" id="setting-modal" className="modal-toggle" />
      <div className="modal w-screen">
        <div className="modal-box w-3/4 max-w-6xl">
          <label htmlFor="setting-modal" className="btn btn-md btn-circle bg-basic text-xl font-bold border-basic absolute right-2 top-2">✕</label>
          <h2 className="text-xl font-bold text-basic">配信設定</h2>
          <ModalTitle text={"あなたのカメラ映像"} />
          <video ref={videoRef} playsInline muted/>
          {cam ? <ModalText text={"映像を配信中です！"} /> : <ModalText text={"映像は配信されていません！"} />}
        </div>
      </div>
    </>
  )
}

const ModalText = ({ text }) => {
  return (
    <p className="font-bold py-1">{text}</p>
  )
}

const ModalTitle = ({ text }) => {
  return (
    <h2 className="py-4 font-bold text-xl">{text}</h2>
  )
}

export default SettingModal;