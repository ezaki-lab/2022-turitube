import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';
import Chat from './chat';
import Metaverse from './metaverse';
import Hamburger from '../../components/Layout/hamburger';
import { useInterval } from '../../hooks/useInterval';
import Exit from "../../img/buttons/exit.png";
import Send from "../../img/buttons/send.png";
import myStreamManager from './myStream';
import multiStreamManager from './multiStream';
import useSocketIo from '../../hooks/useSocketIo';

// Room 視聴者視点の画面
const Listener = () => {
  const [width, height] = useWindowSize();
  const [isMetaverse, setIsMetaverse] = useState<boolean>(true); // メタバース画面であるか
  const [HiddenLayerCount, setHiddenLayerCount] = useState<number>(3); //　状態:ビデオ時に他のレイヤーが消えているかどうか
  const [delay, setDelay] = useState<null | number>(null);
  const [touch, setTouch] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const textRef = useRef(null);
  const socket = useSocketIo("stream");
  const { myStream, setAudio, setCamera, setFace } = myStreamManager(socket);
  const multiStream = multiStreamManager(socket);
  const [me, setMe] = useRecoilState(atom.me);

  useInterval(() => {
    if (HiddenLayerCount && !isMetaverse && !isInput) setHiddenLayerCount((rev) => (rev - 1));
  }, delay);

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit("join", {
          room_id: "dev_room",
          user_name: me.user_name,
          user_type: "listener"
        })
      })
    }
  }, [socket]);

  const send = () => {
    if (textRef.current.value.match(/\S/g)) {
      socket.emit("chat", {
        room_id: "dev_room",
        user_name: me.user_name,
        text: textRef.current.value
      })
      textRef.current.value = "";
    }
  }

  // 要素が消える機能はビデオ限定
  useEffect(() => {
    if (isMetaverse) {
      setHiddenLayerCount(3);
      setDelay(null);
    }
    else {
      setDelay(1000);
    }
  }, [isMetaverse]);

  useEffect(() => {
    console.log(touch)
    if (touch) { setDelay(null); setHiddenLayerCount(3); }
    else { setDelay(1000); setHiddenLayerCount(3); }
  }, [touch]);

  // メタバースレイアウト
  return (
    <>
      <div className={`${HiddenLayerCount ? "" : "hidden"}`} onClick={() => setDelay(null)}>
        <Hamburger />
      </div>

      {/*退出ボタン */}
      <label htmlFor="exit-modal" className={`fixed z-50 top-1 left-2 w-12 h-12 active:animate-button-push ${HiddenLayerCount ? "" : "hidden"}`} onClick={() => { setDelay(null); /* */ }}>
        <img src={Exit} className="w-full h-full" />
      </label>

      <div className={`flex flex-${width > height ? "row" : "col"} h-full w-full items-center`} onTouchStart={() => { setTouch(true); }} onTouchEnd={() => { setTouch(false); }} onMouseMove={() => { setHiddenLayerCount(5); setDelay(1000) }}>

        {/*メタバース画面 */}
        <div className={`aspect-square bg-black flex justify-center items-center ${width > height ? "h-full max-w-[60%]" : "w-full max-h-[calc(100%-320px)]"} ${isMetaverse ? "" : "hidden"}`}>
          <Metaverse />
        </div>

        {/*映像 */}
        <div className={`w-full h-full bg-black fixed ${isMetaverse ? "hidden" : ""}`}>
          <img src="https://magazine.coconala.com/wp-content/uploads/2019/09/shutterstock_116146678.jpg" className="object-contain w-full h-full" />
        </div>

        <div className={`aspect-square ${width > height ? "h-full w-20 flex-auto" : "w-full max-h-[50%]"} bg-white flex justify-center items-center ${isMetaverse ? "hidden" : ""}`} />

        {/*チャット欄と入力 */}
        <div className={`flex-auto flex flex-col-reverse items-center z-10 px-2 pb-1 pointer-events-none ${HiddenLayerCount ? "" : "hidden"} ${width > height ? "w-2 h-full pt-12" : "h-2 w-full"}`}>
          <div className="h-12 w-full flex items-center p-1 pointer-events-auto" onMouseDown={() => { setHiddenLayerCount(5); setDelay(null) }}>
            <input ref={textRef}
              type="text" 
              placeholder="コメントを入力" 
              className="w-10 h-full rounded-full text-white bg-basic bg-opacity-50 border-2 border-basic-dark placeholder-white px-2 flex-auto" 
              onClick={() => setIsInput(true)} 
              onBlur={() => setIsInput(false)}
              onKeyPress={e => {
                if (e.key == "Enter") {
                    send();
                }
            }} />
            <button className="h-full active:animate-button-push w-12" onClick={() => { send() }}>
              <img src={Send} className="h-full w-12 px-1" />
            </button>

          </div>
          <div className={`w-full h-2 flex-auto flex flex-col ${width > height ? "max-h-[300px]" : isMetaverse ? "max-h-[300px]" : "max-h-[200px]"} pointer-events-auto`}>
            <Chat socket={socket} />
          </div>

        </div>
      </div>
    </>
  );
};

export default Listener;