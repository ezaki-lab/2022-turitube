import React, { useEffect, useState, useRef } from 'react';
import { useInterval } from '../../hooks/useInterval';

// 通知
const Notification = ({text, setText}) => {
  const [count, setCount] = useState(-1);
  useEffect(() => {
    if (text) setCount(3);
  }, [text]);

  useInterval(() => {
    setCount((rev) => (rev-1));
    if (count<0) {
      setText("");
    }
  }, 1000);

  if (count<0) return (<></>)

  return (
    <>
      <div className="z-100000 fixed bg-basic top-0 h-6 w-full flex items-center justify-center animate-slide-in-top">
        <p className="text-white font-bold">{text}</p>
      </div>
    </>
  );
}

export default Notification;