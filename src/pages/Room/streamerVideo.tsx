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
import ProgressBar from '../../components/ProgressBar';
import ExpressionDiscrimination from './expressionDiscrimination';

// 動画描画コンポーネントと音声配信
const StreamerVideo = ({ myStream, socket, multiStream, setIsMetaverse, setNotification, setCamera, setFace }) => {
  const [me] = useRecoilState(atom.me);
  const { localStream, setConstraints, readyCam, change } = useCamera({ video: { facingMode: "user" }, audio: false });
  const { room_id } = useParams();
  const { remoteVideo, myPeer, room, readySkyWay } = useSkyWay(room_id, localStream, readyCam);
  const [remotePeer, setRemotePeer] = useState("");
  const { lat, lng } = useGetPosition();
  const [closeCount, setCloseCount] = useState(60);
  const [delay, setDelay] = useState(null);
  const viewRef = useRef<HTMLVideoElement>(null);

  // 動画を描画 こっちのほうが安全...なはず
  useEffect(() => {
    if (localStream&&viewRef.current) {
      viewRef.current!.srcObject = localStream.current;
      viewRef.current.play();
    }
  }, [localStream.current, viewRef.current]);

  // カメラ変更(readyCamも変わるよ)
  useEffect(() => {
    if (localStream.current) {
      setConstraints({
        audio: myStream.audio,
        video: myStream.camera ? { facingMode: { exact: "environment" } } : { facingMode: "user" }, //本番用
        //video: !myStream.camera ? { facingMode: { exact: "environment" } } : { facingMode: "user" }, //デバッグ用
      });
      if (myStream.camera) {
        setCloseCount(60);
        setDelay(1000);
        setNotification("60秒後に自動的にオフになります...")
      }
      else {
        setDelay(null);
      }
    }
  }, [myStream.camera]);

  useInterval(() => {
    if (closeCount == 0) {
      setCamera(false);
    }
    else setCloseCount((rev) => (rev - 1));
  }, delay);

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
      {remotePeer == myPeer ? <MyVideo viewRef={viewRef} setNotification={setNotification} lat={lat} lng={lng} /> : <ExpressionDiscrimination setCamera={setCamera} viewRef={viewRef} setFace={setFace} />}
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
const MyVideo = ({ setNotification, lat, lng, viewRef }) => {
  const [picture, setPicture] = useState<string>("");
  const [fishImg, setFishImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [detectionCooltime, setDetectionCooltime] = useState<number>(60);
  const [detectionDelay, setDetectionDelay] = useState<boolean | number>(null);
  const { room_id } = useParams();
  const [me] = useRecoilState(atom.me);
  const [detectingCount, setDetectingCount] = useState<number>(0);

  useInterval(() => {
    if (detectionCooltime == 0) { setDetectionDelay(null); setLoading(false); }
    else setDetectionCooltime((rev) => (rev - 1));
  }, detectionDelay);

  // 画像送信
  useEffect(() => {
    if (picture) {
      setNotification("写真を保存中です...")
      axios.post(Url("/stream_photo"), {
        room_id: room_id,
        user_id: me.user_id,
        user_name: me.user_name,
        lat: lat,
        lng: lng,
        base64img: picture
      }).then((res) => {
        setNotification("写真を保存しました！")
      }).catch((e) => {
        setNotification("なんらかの問題が発生しました")
      });
    }
  }, [picture]);

  // 推論
  useEffect(() => {
    if (fishImg) {
      axios.post(Url("/fish_detection"), {
        room_id: room_id,
        base64img: fishImg,
        lat: lat,
        lng: lng,
        user_id: me.user_id
      }).then((res) => {
        // 識別中ならカウントアップする
        if (res.data.detecting) setDetectingCount((res.data.count));
        // 無識別ならカウントを消す
        else setDetectingCount(0);
        // 検出完了したらクールタイム+検出カウントを0にする。そして通知
        if (res.data.detected) {
          setDetectionDelay(1000);
          setDetectingCount(0);
          setNotification(`判別結果: ${res.data.name} 写真を保存しました！`)
        }
        // 検出中ならこっち
        else {
          setLoading(false);
        }
      })
    }
  }, [fishImg])

  // 画像をb64にする
  const acquisitionImg = () => {
    let canvas = document.createElement("canvas");
    const { videoWidth, videoHeight } = viewRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(viewRef.current, 0, 0, videoWidth, videoHeight)
    let base64img = canvas.toDataURL("image/jpeg")
    return base64img;
  }

  // 0.2秒に一回撮影する
  useInterval(() => {
    if (!loading) {
      let base64img = acquisitionImg();
      setFishImg(base64img);
      setLoading(true);
    }
  }, 200);

  // 撮影ボタン押下時
  const writeNewPicture = () => {
    let base64img = acquisitionImg();
    setPicture(base64img);
  }

  return (
    <>
      <video ref={viewRef} playsInline muted className="object-contain w-full h-full" />
      <div className="fixed bottom-16 w-full h-24 flex items-center flex-col z-20">
        <button className="bg-gray bg-opacity-50 w-16 h-16 rounded-full flex items-center justify-center active:animate-button-push" onClick={() => { writeNewPicture() }}>
          <div className="rounded-full w-12 h-12 bg-gray bg-opacity-75" />
        </button>
        <div className="w-64">
          {detectingCount
            ? <ProgressBar value={detectingCount} max={5} /> : <></>}
        </div>

      </div>
    </>

  )
}

export default StreamerVideo;