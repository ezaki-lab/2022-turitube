// ビデオ画面
import React, { useContext, useEffect, useState, useRef } from 'react';
import Shrink from '../../../img/icons/shrink.png';

type VideoStream = {
  stream: MediaStream;
  peerId: string;
};

const Video = ({ remoteVideo, stream, myStream }) => {
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [existRemoteVideo, setExistRemoteVideo] = useState(false);

  useEffect(() => {
    let remoteExistflg = false
    console.log(stream)
    stream.users.forEach((elem, index) => {
      if(elem.cam && elem.user_name!==myStream.user_name){
        remoteExistflg = true;
      }
    })
    setExistRemoteVideo(remoteExistflg);
  }, [stream]);
  
  // ビデオインデックスを設定する
  // (video emit(peer_id) receive → remoteVideoからindexをifで取得);

  // remoteでの配信があるとき
  if (existRemoteVideo) {
    return (
      <div className="w-full h-full bg-basic bg-opacity-50 flex flex-col justify-start">
        {remoteVideo.length ? <RemoteVideo remoteVideo={remoteVideo} video_index={videoIndex} /> : <></>}
      </div>
    )
  }

  // remoteのカメラが無い時
  return (
      <>
        <div className="w-full h-full bg-basic bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-xl font-bold text-white">他に誰も配信していません</h1>
        </div>
      </>
  )
};

const RemoteVideo = ({ remoteVideo, video_index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = remoteVideo[video_index].stream;
      videoRef.current.play().catch((e) => console.log(e));
    }
  }, [remoteVideo]);

  return <video ref={videoRef} className="w-full h-full object-contain object-top" playsInline />
}

export default Video;