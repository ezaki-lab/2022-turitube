import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Url from '../../utils/url';
import { useInterval } from '../../hooks/useInterval';

// Example - example.jsx

interface emotion {
  detect: boolean,
  face_id: number,
  score: number
}

const ExpressionDiscrimination = ({ setCamera, viewRef, setFace }) => {
  const [expressionImg, setExpressionImg] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.log("a")
      let base64img = acquisitionImg();
      setExpressionImg(base64img);
    }
  }, 2000);

  useEffect(() => {
    axios.post(Url("/expression"), {
      base64img: expressionImg
    }).then((res) => {
      // 検知できていなかったら
      if (!res.data.detect){
        // 準備中
        setFace(1);
      }
      else {
        // カメラ切り替え条件
        if (res.data.face_id==3 && res.data.score>0.8) {
          setCamera(true);
        }
        // 表情切り替え
        setFace(res.data.face_id);
      }
    })
  }, [expressionImg]);

  return (
    <>
      <video ref={viewRef} muted playsInline />
    </>
  );
}

export default ExpressionDiscrimination;