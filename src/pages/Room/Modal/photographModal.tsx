/*  Room/send */
import React, { useState, useEffect, useRef } from 'react';
import { useInterval } from '../../../hooks/useInterval';
import useCamera from '../../../hooks/useCamera';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import * as atom from '../../../common/atom';
import { useGetPosition } from '../../../hooks/useGetPosition';

const INITIAL_COUNT = 5

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 撮影用コンポーネント、撮影フラグが立ったら画面全体に自分のカメラを表示する
// 訂正。ボタン押したときに反応するようにする。
const PhotographModal = ({ setPhotoGraphFlag, photoGraphFlag, room_id, localStream, readyCam, setDetectionResult }) => {
  const [img, setImg] = useState("");
  const { lat, lng } = useGetPosition();
  const base_url = "https://ezaki-lab.cloud/~turitube/api/speacies";
  const [count, setCount] = useState(INITIAL_COUNT);
  const [delay, setDelay] = useState<number | null>(null); // 1秒またはnull
  const [userInfo] = useRecoilState(atom.user_info);
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    if (readyCam) {
      videoRef.current!.srcObject = localStream.current;
      videoRef.current.play().catch((e) => console.log(e));
    }
  }, [readyCam]);

  // 画像送信
  useEffect(() => {
    (async () => {
      if (photoGraphFlag && img) {
        await _sleep(1000);
        axios.post(base_url, {
          room_id: room_id,
          user_id: userInfo.user_id,
          user_name: userInfo.user_name,
          lat: lat,
          lng: lng,
          base64img: img
        }).then((res) => {
          console.log(res); //レスポンスいれて記録完了！とかやる
          if (res.data.status == 404) setImg("")
          else {
            setPhotoGraphFlag(false);
            setDetectionResult(res.data)
          }
        })
      }
      else writeNewImg();
    })()
  }, [img]);

  useEffect(() => {
    console.log(photoGraphFlag);
    if (photoGraphFlag) {
      writeNewImg();
    }
    else setImg("");
  }, [photoGraphFlag]);

  const writeNewImg = () => {
    let canvas = document.createElement("canvas");
    const { videoWidth, videoHeight } = videoRef.current;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight)
    setImg(canvas.toDataURL("image/jpeg"));
  }

  return (
    <>
      <input type="checkbox" id="photograph-modal" className="modal-toggle" checked={photoGraphFlag} onChange={(e) => { e.target.checked ? setPhotoGraphFlag(true) : setPhotoGraphFlag(false) }} />
      <div className="modal w-screen">
        <div className="modal-box w-3/4 max-w-6xl">
          <h2 className="text-xl font-bold text-basic">魚のAI判別</h2>
          <label htmlFor="photograph-modal" className="btn btn-md btn-circle bg-basic text-xl font-bold border-basic absolute right-2 top-2">✕</label>
          <h1 className="text-black text-md font-bold pt-5">魚を映すと自動で撮影します！</h1>
          <video ref={videoRef} className={`h-1/2 object-contain object-top py-4`} playsInline muted />
        </div>
      </div>
    </>


  )
};



export default PhotographModal;