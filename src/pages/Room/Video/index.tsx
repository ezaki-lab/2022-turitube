// ビデオ画面
import React, { useContext, useEffect, useState, useRef } from 'react';
import kariImg from '../../../img/kari2.png';

const RemoteVideo = ({ remoteVideo, remoteStream }) => {
  const [existRemoteVideo, setExistRemoteVideo] = useState(false);
  const [video, setVideo] = useState(null);
  const [displayPeerId, setDisplayPeerId] = useState("");

  // ユーザー情報の変化時に配信不都合が起きてないか確認
  useEffect(() => {
    // 他の配信者にカメラonがいるかを確認
    let tmpPeerId = "";
    let tmpexist = false
    remoteStream.users.forEach((elem, index) => {
      if (elem.cam) {
        tmpPeerId = elem.peer_id
        tmpexist = true
      }
    })
    setDisplayPeerId(tmpPeerId);
    setExistRemoteVideo(tmpexist);

  }, [remoteStream]);

  // displayPeerId変化時、表示させるvideoを変化させる
  useEffect(() => {
    remoteVideo.forEach(function(video) {
      if (video.stream.peerId == displayPeerId) {
        setVideo(video.stream);
      }
    }) 
  }, [displayPeerId]);

  // remoteでの配信があるとき
  if (existRemoteVideo) {
    return (
      <div className="w-full h-full bg-basic bg-opacity-50 flex flex-col justify-start">
        {/*<img src={kariImg} className="w-full h-full object-contain object-top"/>*/}
        {remoteVideo.length ? <Video video={video} /> : <></>}
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

// 指定ビデオ出力(声は出力しない)
const Video = ({ video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video) {
      videoRef.current.srcObject = video;
      videoRef.current.play();
    }
  }, [video]);

  return <video ref={videoRef} className="w-full h-full object-contain object-top" playsInline muted />
}

export default RemoteVideo;