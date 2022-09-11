/*  User */
import { useRecoilState } from 'recoil';
import React, { useState, useEffect, useRef } from 'react';
import Chat from './chat';
import * as atom from '../../common/atom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useGetPosition } from '../../hooks/useGetPosition';
import useCamera from '../../hooks/useCamera';

// ユーザーページ
const Map = () => {
  const { lat, lng } = useGetPosition();
  const localStream = useRef<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>();
  const videoRef2 = useRef<HTMLVideoElement>();
  const videoRef3 = useRef<HTMLVideoElement>();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: {facingMode: "environment"}, audio: true })
      .then((stream) => {
        localStream.current = stream;

        if (videoRef.current) {
          videoRef.current!.srcObject = localStream.current;
          videoRef.current.play().catch((e) => console.log(e));
          videoRef2.current!.srcObject = localStream.current;
          videoRef2.current.play().catch((e) => console.log(e));
          videoRef3.current!.srcObject = localStream.current;
          videoRef3.current.play().catch((e) => console.log(e));//
        }
      })
    return (() => {
      if (localStream.current) localStream.current.getTracks().forEach((track) => (track.stop()));
    })
  }, []);


  return (
    <div>
      <p>{lat}, {lng}</p>
      <Chat />
      <video ref={videoRef} playsInline muted />
      <video ref={videoRef2} playsInline muted />
      <video ref={videoRef3} playsInline muted />
    </div>
  );
};

const Cam = () => {
  const {videoRef} = useCamera({audio: false, video: true});
  return (
    <video ref={videoRef} playsInline />
  )
}

export default Map;