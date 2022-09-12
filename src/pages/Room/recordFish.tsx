/*  Room/chat */
import React, { useEffect, useState, useRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useInterval } from '../../hooks/useInterval';

// チャットログを流すためのコンポーネント
const RecordFish = ({ detectionResult }) => {
  const [display, setDisplay] = useState<number>(2);
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number|null>(null);

  useEffect(() => {
    if (detectionResult) {
      console.log(detectionResult);
      setCount(15);
      setDelay(1000);
      setDisplay(0);
    }
  }, [detectionResult]);

  useEffect(() => {
    if (count==10) setDisplay(1);
    if (count==0) setDisplay(2);
  }, [count]);

  useInterval(() => {
    setCount((rev) => (rev-1));
  }, delay);

  if (display == 0) {
    return (
      <>
        <div className="w-full h-full fixed flex justify-center items-center z-200 bg-black bg-opacity-50">
          <div className="flex flex-col w-full h-full justify-center items-center animate-popup">
            <img src={detectionResult.img} className="w-3/5 sm:w-80 object-contain" />
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold py-2">{detectionResult.name}</h1>
            <h3 className="text-white text-sm md:text-md font-bold">識別に成功しました！</h3>
            <h3 className="text-white text-sm md:text-md font-bold">配信終了後に記録できます！</h3>
            <p className="text-white text-xs font-bold fixed top-2 left-2">{count-10}秒後に自動で次に進みます</p>
          </div>
        </div>
      </>
    )
  }

  else if (display == 1) {
    return (
      <>
        <div className="w-full h-full fixed flex justify-center items-center z-200 bg-black bg-opacity-50">
          <div className="flex flex-col w-full h-full justify-center items-center animate-popup">
            <p className="text-basic text-xl font-bold">実績、クエストの進み具合</p>
            <p className="text-basic text-xl font-bold">(閉じた後にクエスト達成されてたら大きく表示させる)</p>
            <p className="text-white text-sm font-bold fixed top-2 left-2">{count}秒後に自動で閉じます</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
    </>
  );
};

export default RecordFish;