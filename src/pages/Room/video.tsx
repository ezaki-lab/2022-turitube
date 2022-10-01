import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useCamera from '../../hooks/useCamera';
import { useSkyWay } from '../../hooks/useSkyWay';
import { useParams } from 'react-router-dom';

// 動画描画コンポーネントと音声配信
const Video = ({ myStream, socket }) => {
  const [userType, setUserType] = useRecoilState(atom.user_type);
  const { videoRef, localStream, setConstraints, readyCam, changeCamera } = useCamera({ video: userType == "streamer" ? { facingMode: "user" } : false, audio: false });
  const { room_id } = useParams();
  const { remoteVideo, myPeer, room, readySkyWay } = useSkyWay(room_id, localStream, readyCam);

  // セットアップ
  useEffect(() => {

  }, []);

  // マイク設定変更時
  useEffect(() => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => (track.enabled = myStream.audio));
    }
  }, [myStream.audio]);

  // カメラ設定変更時
  useEffect(() => {
    if (localStream.current) {
      setConstraints({
        audio: myStream.audio,
        video: myStream.camera ? { facingMode: { exact: "environment" } } : { facingMode: "user" }
      });
      if (myStream.camera) {
        socket.emit("video", {
          room_id: room_id,
          peer_id: myPeer
        })
      }
    }
  }, [myStream.camera]);

  useEffect(() => {
    console.log(room);
    if (room) {
      room.replaceStream(localStream.current);
    }
  }, [changeCamera]);

  return (
    <>
      <Draw remoteVideo={remoteVideo} myPeer={myPeer} myVideoRef={videoRef} socket={socket} />
      {remoteVideo.map((v, i) => {
        return (
          <Audio video={v.stream} key={i} />
        )
      })}
    </>
  );
}

// 描画コンポーネント
const Draw = ({ remoteVideo, myPeer, myVideoRef, socket }) => {
  const displayVideo = useRef<HTMLVideoElement>(null);
  const [remotePeer, setRemotePeer] = useState<string>(null);
  // 動画の描画先を指定する
  useEffect(() => {
    if (socket) {
      socket.on("video", (data) => {
        console.log(data);
        setRemotePeer(data.peer_id);
      })
    }
  }, [remoteVideo]);

  // peerIdに応じて再生するものを変える
  useEffect(() => {
    remoteVideo.map((v, i) => {
      if (v.peerId == remotePeer) {
        displayVideo.current!.srcObject = remoteVideo.stream;
        displayVideo.current.play().catch((e) => console.log(e));
        console.log(remotePeer, myPeer);
      }
    })
  }, [remotePeer]);

  if (!remotePeer) return (<></>)
  if (remotePeer == myPeer) return (
    <video ref={myVideoRef} className="object-contain w-full h-full" muted playsInline />
  )

  return (
    <video ref={displayVideo} className="object-contain w-full h-full" muted playsInline />
  )
}

const Audio = ({ video }) => {
  const audioRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (video) {
      audioRef.current.srcObject = video;
      audioRef.current.play();
    }
  }, [audioRef.current]);

  return (
    <video ref={audioRef} className="hidden" playsInline />
  )
}

export default Video;