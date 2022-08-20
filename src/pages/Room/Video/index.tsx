// ビデオ画面
import React, { useEffect, useState, useRef } from 'react';
import Shrink from '../../../img/icons/shrink.png';

type VideoStream = {
  stream: MediaStream;
  peerId: string;
};

const Video = ({ remoteVideo, setLocalStream }) => {
  /*
    const RemoteVideo = (props: { video: VideoStream }) => {
      const videoRef = useRef<HTMLVideoElement>(null);
    
      useEffect(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = props.video.stream;
          videoRef.current.play().catch((e) => console.log(e));
        }
      }, [props.video]);
      return <video ref={videoRef} playsInline></video>;
    };
  */

  console.log(remoteVideo);
  return (
    <>
      <div className="w-full h-full bg-basic bg-opacity-50 flex flex-col justify-start ">
        {remoteVideo.length ? <RemoteVideo remoteVideo={remoteVideo} video_index={0} /> : <></>}
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
  return <video ref={videoRef} className="w-full h-full object-cover" playsInline /> 
}

export default Video;