import React, { useState, useRef, useEffect } from 'react';

// 配信中設定モーダル
const SettingModal = ({ localStream, cam }) => {
  return (
    <>
      <input type="checkbox" id="setting-modal" className="modal-toggle" />
      <div className="modal w-screen">
        <div className="modal-box w-3/4 max-w-6xl">
          <label htmlFor="setting-modal" className="btn btn-md btn-circle bg-basic text-xl font-bold border-basic absolute right-2 top-2">✕</label>
          <h2 className="text-xl font-bold text-basic">配信設定</h2>
          <ModalTitle text={"あなたのカメラ映像"} />
          <LocalVideo localStream={localStream} cam={cam} />
          {cam ? <ModalText text={"カメラ映像を配信中です！"} /> : <ModalText text={"カメラは現在オフになっています！"} />}
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

const LocalVideo = ({ localStream, cam }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (localStream.current) {
      videoRef.current.srcObject = localStream.current;
      videoRef.current.play().catch((e) => console.log(e));
    }
  }, [cam]);

  return <video ref={videoRef} className="w-full object-contain object-top" muted playsInline />
}

export default SettingModal;