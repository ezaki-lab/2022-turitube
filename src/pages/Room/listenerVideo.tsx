import React, { useEffect, useState, useRef } from 'react';
import useCamera from '../../hooks/useCamera';
import { useSkyWay } from '../../hooks/useSkyWay';
import { useParams } from 'react-router-dom';

// 動画描画コンポーネントと音声配信
const ListenerVideo = ({ remotePeer }) => {
  const { room_id } = useParams();
  const [stream, setStream] = useState<MediaStream>(null);
  const [readyCam, setReadyCam] = useState(false);
  const { remoteVideo, readySkyWay } = useSkyWay(room_id, stream, readyCam);

  // 変更時処理
  useEffect(() => {
    // 既存ストリームを削除
    if (stream) {
      stream.getTracks().forEach((track) => { stream.removeTrack(track); track.stop(); });
    }
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(async (stream) => {
        stream.getAudioTracks().forEach((track) => (track.enabled = false));
        setStream(stream);
        setReadyCam(true);
      });
  }, []);

  if (!readySkyWay && !readyCam) return (<></>)
  return (
    <>
      {remoteVideo.map((v, i) => {

        return (<div key={v.peerId}>
          {remotePeer == v.peerId
            ? <Display video={v} />
            : <Audio video={v} />}
        </div>)
      })}
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
    <video ref={viewRef} playsInline muted className={`object-contain w-full h-full`} />
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
    <video ref={viewRef} playsInline muted className={`hidden`} />
  )
}


export default ListenerVideo;