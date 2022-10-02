import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../common/atom';
import useCamera from '../../hooks/useCamera';
import { useSkyWay } from '../../hooks/useSkyWay';
import { useParams } from 'react-router-dom';

// 動画描画コンポーネントと音声配信
const StreamerVideo = ({ myStream, socket, multiStream, setIsMetaverse }) => {
  const [userType] = useRecoilState(atom.user_type);
  const [me] = useRecoilState(atom.me);
  const { localStream, setConstraints, readyCam, change } = useCamera({ video: userType == "streamer" ? { facingMode: "user" } : false, audio: false });
  const { room_id } = useParams();
  const { remoteVideo, myPeer, room, readySkyWay } = useSkyWay(room_id, localStream, readyCam);
  const [remotePeer, setRemotePeer] = useState("");

  // カメラ変更(readyCamも変わるよ)
  useEffect(() => {
    if (localStream.current) {
      setConstraints({
        audio: myStream.audio,
        video: myStream.camera ? { facingMode: { exact: "environment" } } : { facingMode: "user" }
      });
    }
  }, [myStream.camera]);

  // replace room setting
  useEffect(() => {
    (async() => {
      if (room) {
      room.replaceStream(localStream.current);
      if (myStream.camera) await new Promise(resolve => setTimeout(resolve, 500));
      socket.emit("video", {
        room_id: room_id,
        enable: myStream.camera,
        peer_id: myPeer,
        user_name: me.user_name
      })
    }
    })()
    
  }, [change]);

  // メタバース画面かビデオ画面か
  useEffect(() => {
    if (multiStream.displayPeer) {
      setIsMetaverse(false);
    }
    else {
      setIsMetaverse(true);
    }
    setRemotePeer(multiStream.displayPeer);
  }, [multiStream.displayPeer]);

  // マイク変更
  useEffect(() => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => (track.enabled = myStream.audio));
    }
  }, [myStream.audio]);

  if (!readyCam && !readySkyWay) return (<></>)
  return (
    <>
      {remoteVideo.map((v, i) => {

        return (<>
          {remotePeer == v.peerId
            ? <Display video={v} key={v.peerId} />
            : <Audio video={v} key={v.peerId} />}
        </>)
      })}
      {remotePeer == myPeer ? <MyVideo video={localStream.current} /> : <></>}
    </>
  )
}

// 複数人配信の表示(カメラオン時)
const Display = ({ video }) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video) {
      viewRef.current!.srcObject = video.stream;
      viewRef.current.play().catch((e) => console.log(e));
    }
  }, [video]);

  return (
    <video ref={viewRef} playsInline className={`object-contain w-full h-full`} />
  )
}

const Audio = ({ video }) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video) {
      viewRef.current!.srcObject = video.stream;
      viewRef.current.play().catch((e) => console.log(e));
    }
  }, [video]);

  return (
    <video ref={viewRef} playsInline className={`hidden`} />
  )
}

const MyVideo = ({ video }) => {
  const viewRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    viewRef.current.srcObject = video;
    viewRef.current.play();
  }, [viewRef.current]);

  return (
    <video ref={viewRef} playsInline muted className="object-contain w-full h-full" />
  )
}

export default StreamerVideo;