/*  Room/stream */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Video from './Video';
import Metaverse from './Metaverse';

import Shrink from "../../img/icons/shrink.png";
import LeaveStream from "../../img/icons/leave_stream.png";
import Send from './send';
import Chat from './chat';

import useSocketIo from '../../hooks/useSocketIo';
import Mic from '../../img/icons/mic.active.png';
import MicInactive from '../../img/icons/mic.inactive.png';
import { Link } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

import { useSkyWay } from '../../hooks/useSkyWay';

// 配信画面
const Room = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [mic, setMic] = useState<boolean>(false); // trueならマイクオン
  const [screen, setScreen] = useState<string>("video"); // デフォルトではmetaverse
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);
  const { room_id } = useParams();
  const socket = useSocketIo('stream');
  
  const [remoteVideo, setLocalStream] = useSkyWay(room_id);
  
  // socket.io関連
  useEffect(() => {
    if (socket) {
      // 接続できたら
      socket.on('connect', async () => {
        // roomに参加
        socket.emit("join", {
          room_id: room_id,
          user_name: userInfo.user_name,
          screen_name: userInfo.screen_name
        });
        setReady(true);
      });

      // roomの環境が変化したときに実行
      socket.on("update_room", (data) => {
        // room情報を反映させる
      });

      // 誰かが抜けたときの処理
      socket.on("disconnect_others", (data) => {
        // 表示上の削除を行う(というか再レンダリング)
      })

      return (() => {
        socket.disconnect();
      });

    }
  }, [socket]);

  const MuteSwitch = () => {
    setMic(mic ? false : true);
    console.log(mic)
  };

  const ScreenSwitch = () => {
    setScreen(screen == "metaverse" ? "video" : "metaverse")
  };

  if (!ready) return (<></>)

  return (
    <>
      <Link to="/">
        <button className="aspect-square h-12 mr-4 mt-4 fixed z-50 top-0 right-0">
          <img src={LeaveStream} className="h-full object-cover" />
        </button>
      </Link>


      <div className="h-10 mb-4 px-4 w-full fixed z-50 bottom-0 flex flex-row justify-around">
        <div className="w-full px-6">
          <Send socket={socket} />
        </div>

        <button className="aspect-square h-full flex items-center justify-center rounded-full bg-white bg-opacity-75 h-full" onClick={MuteSwitch}>
          <img src={mic ? Mic : MicInactive} className="h-full object-cover rounded-full h-5/6 w-5/6" />
        </button>
      </div>

      <div className="h-40 sm:h-2/5 mb-4 sm:mx-4 fixed z-50 bottom-16 w-full sm:w-64 xl:w-96 right-0 sm:bg-yellow-100 sm:bg-opacity-50 rounded-xl">
        <Chat socket={socket} />
      </div>

      <button className="aspect-square h-24 ml-4 mt-4 fixed z-50 top-0 left-0" onClick={ScreenSwitch}>
        <img src="https://appleenglish.jp/wp-content/uploads/2020/11/ECF9852A-03F8-4F76-9301-414D6C84D745.jpeg" className="h-full object-cover" />
      </button>

      {screen == "video" ? <Video remoteVideo={remoteVideo} setLocalStream={setLocalStream}  /> : <Metaverse socket={socket} />}
    </>
  );
};

export default Room;