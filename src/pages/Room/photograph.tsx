/*  Room/send */
import React, { useState, useEffect, useRef } from 'react';
import { useInterval } from '../../hooks/useInterval';
import useCamera from '../../hooks/useCamera';

const INITIAL_COUNT = 5

// 撮影用コンポーネント、撮影フラグが立ったら画面全体に自分のカメラを表示する
const Photograph = ({ setImg, photographFlag }) => {
    const [count, setCount] = useState(INITIAL_COUNT);
    const [delay, setDelay] = useState<number | null>(1000); // 1秒またはnull
    const videoRef = useCamera(true, false);

    let canvas = document.createElement("canvas");

    useEffect(() => {
        if (!count) {
            console.log(count);
            setCount(INITIAL_COUNT);
            setDelay(null);
            console.log(videoRef.current);
            const { videoWidth, videoHeight } = videoRef.current;
            canvas.width = videoWidth;
            canvas.height = videoHeight;
            const context = canvas.getContext("2d");
            context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight)

            // 画像をクライアントに保存(保存すると自動で閉じられる)
            setImg(canvas.toDataURL("image/jpeg"));
        }
    }, [count]);

    useInterval(() => {
        if (photographFlag) setCount(count - 1)
    }, delay)

    useEffect(() => {
        if (photographFlag) setDelay(1000);
    }, [photographFlag])

    return (
        <>
            <div className={`h-full w-full z-100 fixed bg-black bg-opacity-50 flex flex-col justify-center items-center ${photographFlag ? "" : "hidden"}`}>
                <h1 className="text-white text-2xl font-bold">{count}</h1>
                <video ref={videoRef} className={`w-full object-contain object-top py-4`} playsInline />
            </div>
        </>
    )
};



export default Photograph;