import React, { useEffect, useState, useRef } from 'react';
import Chat from './chat';
import Metaverse from './metaverse';
import Hamburger from '../../components/Layout/hamburger';
import { useInterval } from '../../hooks/useInterval';
import Exit from "../../img/buttons/exit.png";
import CameraActive from "../../img/icons/camera.active.png";
import CameraInactive from "../../img/icons/camera.inactive.png";
import AudioActive from "../../img/icons/mic.active.png";
import AudioInactive from "../../img/icons/mic.inactive.png";
import myStreamManager from './myStream';
import StreamerVideo from './streamerVideo';
import VideoChat from './videoChat';
import Notification from '../../components/Notification';

// Room 視聴者視点の画面
const Streamer = ({ socket, multiStream, remotePeer, isMetaverse, setMyPeer, myPeer }) => {
  const [HiddenLayerCount, setHiddenLayerCount] = useState<number>(3); //　状態:ビデオ時に他のレイヤーが消えているかどうか
  const [delay, setDelay] = useState<null | number>(null);
  const [touch, setTouch] = useState(false);
  const [isInput] = useState(false);
  const { myStream, setAudio, setCamera, setFace } = myStreamManager(socket);
  const [notification, setNotification] = useState<string>("");

  useInterval(() => {
    if (HiddenLayerCount && !isMetaverse && !isInput) setHiddenLayerCount((rev) => (rev - 1));
  }, delay);

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

  useEffect(() => {
    if (socket && myPeer) {
      socket.on("camera_on", (data) => {
        if (data.peer_id!==myPeer) setCamera(false);
      });
    }
  }), [socket, myPeer];

  return (
    <>
      <Notification text={notification} setText={setNotification} />
      <div className={`${HiddenLayerCount ? "" : "hidden"}`} onClick={() => setDelay(null)}>
        <Hamburger />
      </div>

      <div className={`fixed z-50 top-1 right-16 flex flex-row h-12 justify-around ${HiddenLayerCount ? "" : "hidden"}`}>
        <div className={`w-12 h-12 rounded-full mx-1 ${myStream.camera ? "bg-basic bg-opacity-75" : "bg-black bg-opacity-20"} flex`}>
          <img src={myStream.camera ? CameraActive : CameraInactive} className="w-8 h-8 m-auto" onClick={() => { setCamera((rev) => (!rev)); }} />
        </div>

        <div className={`w-12 h-12 rounded-full mx-1 ${myStream.audio ? "bg-basic bg-opacity-75" : "bg-black bg-opacity-20"} flex`}>
          <img src={myStream.audio ? AudioActive : AudioInactive} className="w-8 h-8 m-auto" onClick={() => setAudio((rev) => (!rev))} />
        </div>
      </div>

      {/*退出ボタン */}
      <label htmlFor="exit-modal" className={`fixed z-50 top-1 left-2 w-12 h-12 active:animate-button-push ${HiddenLayerCount ? "" : "hidden"}`} onClick={() => { setDelay(null); /* */ }}>
        <img src={Exit} className="w-full h-full" />
      </label>

      <div className="w-full h-full flex sm-max:flex-col bg-black" onTouchStart={() => { setTouch(true); }} onTouchEnd={() => { setTouch(false); }} onMouseMove={() => { setHiddenLayerCount(5); setDelay(1000) }}>

        {/*メタバース画面 */}
        <div className="sm-max:w-[350px] sm-max:max-h-[350px] sm-max:mx-auto sm-max:max-w-full sm:h-[400px] sm:max-h-[100%] sm:my-auto md:h-[500px] lg:h-[650px] xl:h-[800px] aspect-square">
          {isMetaverse ? <Metaverse multiStream={multiStream} /> : <></>}
        </div>

        {/*映像 */}
        <div className={`w-full h-full bg-black fixed ${isMetaverse ? "opacity-0" : ""}`}>
          <StreamerVideo myStream={myStream} socket={socket} setNotification={setNotification} setCamera={setCamera} setFace={setFace} remotePeer={remotePeer} setMyPeer={setMyPeer} />
        </div>

        <div className={`${isMetaverse ? "bg-white" : "hidden"} flex-auto flex flex-col-reverse items-center z-10 sm:pt-16`}>
          <div className={`w-full h-24 flex-auto flex flex-col pointer-events-auto bg-white border-y border-gray-light`}>
            <Chat socket={socket} />
          </div>
        </div>
      </div>
      {!isMetaverse
        ? <VideoChat socket={socket} /> : <></>}
    </>
  )
};


export default Streamer;