import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../common/atom';
import useWindowSize from '../../hooks/useWindowSize';
import Chat from './chat';
import Metaverse from './metaverse';
import Hamburger from '../../components/Layout/hamburger';
import { useInterval } from '../../hooks/useInterval';
import Exit from "../../img/buttons/exit.png";
import Send from "../../img/buttons/send.png";
import myStreamManager from './myStream';
import { useParams } from 'react-router-dom';
import ListenerVideo from './listenerVideo';

// Room 視聴者視点の画面
const Listener = ({socket, multiStream, remotePeer, isMetaverse}) => {
  const [width, height] = useWindowSize();
  const [HiddenLayerCount, setHiddenLayerCount] = useState<number>(3); //　状態:ビデオ時に他のレイヤーが消えているかどうか
  const [delay, setDelay] = useState<null | number>(null);
  const [touch, setTouch] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const textRef = useRef(null);
  const { myStream, setAudio, setCamera, setFace } = myStreamManager(socket);
  const [me, setMe] = useRecoilState(atom.me);
  const { room_id } = useParams();

  useInterval(() => {
    if (HiddenLayerCount && !isMetaverse && !isInput) setHiddenLayerCount((rev) => (rev - 1));
  }, delay);

  useEffect(() => {

  }, []);

  const send = () => {
    if (textRef.current.value.match(/\S/g)) {
      socket.emit("chat", {
        room_id: room_id,
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
    if (touch) { setDelay(null); setHiddenLayerCount(3); }
    else { setDelay(1000); setHiddenLayerCount(3); }
  }, [touch]);

  return (
    <>
      <div className={`${HiddenLayerCount ? "" : "hidden"}`} onClick={() => setDelay(null)}>
        <Hamburger />
      </div>

      {/*退出ボタン */}
      <label htmlFor="exit-modal" className={`fixed z-50 top-1 left-2 w-12 h-12 active:animate-button-push ${HiddenLayerCount ? "" : "hidden"}`} onClick={() => { setDelay(null); /* */ }}>
        <img src={Exit} className="w-full h-full" />
      </label>

      <div className="w-full h-full flex sm-max:flex-col bg-black" onTouchStart={() => { setTouch(true); }} onTouchEnd={() => { setTouch(false); }} onMouseMove={() => { setHiddenLayerCount(5); setDelay(1000) }}>

        {/*メタバース画面 */}
        <div className="bg-yellow-200 sm-max:w-[400px] sm-max:mx-auto sm-max:max-w-full sm:h-[400px] sm:max-h-[100%] sm:my-auto md:h-[500px] lg:h-[650px] xl:h-[800px] aspect-square">
          {isMetaverse ? <Metaverse multiStream={multiStream} /> : <></>}
        </div>

        {/*映像 */}
        <div className={`w-full h-full bg-black fixed ${isMetaverse ? "hidden" : ""}`}>
          <ListenerVideo remotePeer={remotePeer} />
        </div>

        <div className={`${isMetaverse ? "bg-white" : ""} flex-auto flex flex-col-reverse items-center z-10 sm:pt-16 ${HiddenLayerCount ? "" : "hidden"}`}>
          <div className="h-10 w-full flex items-center pointer-events-auto bg-white" onMouseDown={() => { setHiddenLayerCount(5); setDelay(null) }}>
            <input ref={textRef}
              type="text"
              placeholder="コメントを入力"
              className="w-10 h-full text-tcolor bg-white placeholder-gray px-2 flex-auto"
              onClick={() => setIsInput(true)}
              onBlur={() => setIsInput(false)}
              onKeyPress={e => {
                if (e.key == "Enter") {
                  send();
                }
              }} />
            <button className="h-full active:animate-button-push px-1 w-12" onClick={() => { send() }}>
              <img src={Send} className="h-full w-10 px-1" />
            </button>

          </div>
          <div className={`w-full h-2 flex-auto flex flex-col pointer-events-auto ${isMetaverse ? "bg-white border-y border-gray-light" : ""}`}>
            <Chat socket={socket} />
          </div>
        </div>
      </div>
    </>
  )
};

export default Listener;