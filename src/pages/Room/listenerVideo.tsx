import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useCamera from '../../hooks/useCamera';
import { useSkyWay } from '../../hooks/useSkyWay';
import { useParams } from 'react-router-dom';
import Kari100 from "../../img/kari100.png";

// 動画描画コンポーネントと音声配信
const ListenerVideo = ({ multiStream, setIsMetaverse }) => {
  const { localStream, readyCam } = useCamera({ video: false, audio: false });
  const { room_id } = useParams();
  const { remoteVideo, readySkyWay } = useSkyWay(room_id, localStream, readyCam);
  const [remotePeer, setRemotePeer] = useState("");

  useEffect(() => {
    if (multiStream.displayPeer) {
      setIsMetaverse(false);
    }
    else {
      setIsMetaverse(true);
    }
    setRemotePeer(multiStream.displayPeer);
  }, [multiStream.displayPeer]);

  if (!readyCam && !readySkyWay) return (<></>)
  return (
    <>
      {remoteVideo.map((v, i) => {
        return (
          <div key={v.peerId}>
            {remotePeer == v.peerId ? <Display video={v.stream} key={v.peerId} /> : <Audio video={v.stream} key={v.peerId} />}
          </div>
        )
      })}
    </>
  )
}

// 複数人配信の表示(カメラオン時)
const Display = ({ video }) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video) {
      viewRef.current!.srcObject = video;
      viewRef.current.play();
    }
  }, [viewRef.current]);

  return (
    <>
      <video ref={viewRef} playsInline className={`object-contain w-full h-full`} />
    </>
  )
}

const Audio = ({ video }) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video) {
      viewRef.current!.srcObject = video;
      viewRef.current.play();
    }
  }, [viewRef.current]);

  return (
    <video ref={viewRef} playsInline className={`hidden`} />
  )
}


export default ListenerVideo;