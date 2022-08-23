// 音声のみ出力
import React, { useContext, useEffect, useState, useRef } from 'react';

type VideoStream = {
  stream: MediaStream;
  peerId: string;
};

// ビデオ描画とは別に音声出力のみのダミービデオが必要
const Audio = ({ remoteVideo }) => {
  // 全ての他のユーザーのビデオから音声のみ抽出してhiddenで表示
  return (
    <>
        {remoteVideo.map((video, index) => (
          <Output video={video} key={video.peerId} />
        ))}
    </>
  )
};

// 音声のみ配信
const Output = ({ video }) => {
  const audioRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    console.log(video);
    if (video) {
      audioRef.current.srcObject = video.stream;
      audioRef.current.play();
    }
  }, [audioRef.current]);

  return (
    <>
      <video ref={audioRef} className="hidden" playsInline />
    </>
  )
}

export default Audio;
