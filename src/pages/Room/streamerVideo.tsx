import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../common/atom';
import useCamera from '../../hooks/useCamera';
import { useSkyWay } from '../../hooks/useSkyWay';
import { useParams } from 'react-router-dom';
import { useGetPosition } from '../../hooks/useGetPosition';
import axios from 'axios';
import Url from '../../utils/url';
import { useInterval } from '../../hooks/useInterval';
import Kari100 from "../../img/kari100.png";

// 動画描画コンポーネントと音声配信
const StreamerVideo = ({ myStream, socket, multiStream, setIsMetaverse, setNotification }) => {
  const [me] = useRecoilState(atom.me);
  const { localStream, setConstraints, readyCam, change } = useCamera({ video: { facingMode: "user" }, audio: false });
  const { room_id } = useParams();
  const { remoteVideo, myPeer, room, readySkyWay } = useSkyWay(room_id, localStream, readyCam);
  const [remotePeer, setRemotePeer] = useState("");
  const {lat, lng} = useGetPosition();

  // カメラ変更(readyCamも変わるよ)
  useEffect(() => {
    if (localStream.current) {
      setConstraints({
        audio: myStream.audio,
        // video: myStream.camera ? { facingMode: { exact: "environment" } } : { facingMode: "user" }, //本番用
        video: !myStream.camera ? { facingMode: { exact: "environment" } } : { facingMode: "user" }, //デバッグ用
      });
    }
  }, [myStream.camera]);

  // replace room setting
  useEffect(() => {
    (async () => {
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

        return (<div key={v.peerId}>
          {remotePeer == v.peerId
            ? <Display video={v} />
            : <Audio video={v} />}
        </div>)
      })}
      {remotePeer == myPeer ? <MyVideo video={localStream.current} setNotification={setNotification} lat={lat} lng={lng}/> : <></>}
    </>
  )
}

// 複数人配信の表示(カメラオン時)
const Display = ({ video }) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video) {
      console.log(video);
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


// 自分の映像(撮影、保存もここで行う)
const MyVideo = ({ video, setNotification, lat, lng }) => {
  const viewRef = useRef<HTMLVideoElement>(null);
  const [img, setImg] = useState<string>("");
  const { room_id } = useParams();
  const [me] = useRecoilState(atom.me);
  const [coolTime, setCoolTime] = useState(0);

  useInterval(() => {
    setCoolTime((rev) => (rev - 1));
  }, 1000)

  // 動画を描画
  useEffect(() => {
    viewRef.current.srcObject = video;
    viewRef.current.play();
  }, [viewRef.current]);

  // 画像送信
  useEffect(() => {
    if (img) {
      axios.post(Url("/stream_photo"), {
        room_id: room_id,
        user_id: me.user_id,
        user_name: me.user_name,
        lat: lat,
        lng: lng,
        base64img: img
      }).then((res) => {
        setNotification("写真を保存しました！")
      }).catch((e) => {
        setNotification("なんらかの問題が発生しました")
      })
    }
  }, [img]);

  useEffect(() => {
    console.log(coolTime);
  }, [coolTime])

  // 撮影ボタンまたは撮影フラグ検出時
  const writeNewImg = () => {
    if (coolTime < 1) {
      let canvas = document.createElement("canvas");
      const { videoWidth, videoHeight } = viewRef.current;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(viewRef.current, 0, 0, videoWidth, videoHeight)
      setImg(canvas.toDataURL("image/jpeg"));
      setCoolTime(5);
      setNotification("写真を保存中です...")
    }
  }

  return (
    <>
      <video ref={viewRef} playsInline muted className="object-contain w-full h-full hidden" />
      <img src={Kari100} className={`object-contain w-full h-full`} />
      <div className="fixed bottom-16 w-full h-12 flex items-center justify-center z-20">
        <button className="bg-gray bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center active:animate-button-push" onClick={() => { writeNewImg() }}>
          <div className="rounded-full w-12 h-12 bg-gray bg-opacity-75" />
        </button>
      </div>
    </>

  )
}

export default StreamerVideo;