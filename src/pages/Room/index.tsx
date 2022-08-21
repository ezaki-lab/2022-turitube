/*  Room/stream */
import React, { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router-dom';
import Video from './Video';
import Metaverse from './Metaverse';
import Modal from './modal';

import LeaveStream from "../../img/icons/leave_stream.png";
import Send from './send';
import Chat from './chat';

import useSocketIo from '../../hooks/useSocketIo';
import useMyStream from '../../hooks/useMyStream';

import Mic from '../../img/icons/mic.active.png';
import MicInactive from '../../img/icons/mic.inactive.png';
import Cam from '../../img/icons/camera.active.png';
import CamInactive from '../../img/icons/camera.inactive.png';
import Setting from '../../img/icons/setting.png';

import { Link } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

import { useSkyWay } from '../../hooks/useSkyWay';

// 配信画面
const Room = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [screen, setScreen] = useState<string>("video"); // デフォルトではmetaverse
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

  // ユーザー全体のストリーム管理
  const [stream, setStream] = useState({});

  const { room_id } = useParams();
  const socket = useSocketIo('stream');

  // 自分自身のストリーム管理
  const { myStream, setMyStream } = useMyStream(room_id, socket);

  const { remoteVideo, localStream } = useSkyWay(room_id, setMyStream, myStream);

  
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
      setMyStream((rev) => ({
        ...rev,
        loading: false
      }));
    }, 1000);
  }, []);

  useEffect(() => {
    setMyStream((rev) => ({
      ...rev,
      screen_name: userInfo.screen_name,
      user_name: userInfo.user_name
    }));
  }, [userInfo])

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
        setMyStream((rev) => ({
          ...rev,
          sid: socket.id
        }))
      });

      // roomの環境が変化したときに実行(streamは自分以外を保存する)
      socket.on("update_room", (data) => {
        let tmpUserData = [];
        data.users.forEach((elem, index) => {
          if(elem.user_name!==myStream.user_name){
            tmpUserData.push(elem);
          }
        })
        setStream({...data, users: tmpUserData});
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

  // ミュートとかカメラオフとかを管理する
  const MuteSwitch = () => {
    setMyStream({ ...myStream, mic: !myStream.mic });
  };

  const CameraSwitch = () => {
    setMyStream({ ...myStream, cam: !myStream.cam });
  }

  useEffect(() => {
    if (ready) {
      localStream.current.getAudioTracks().forEach((track) => (track.enabled = myStream.mic));
    }
  }, [myStream.mic]);

  useEffect(() => {
    if (ready) {
      localStream.current.getVideoTracks().forEach((track) => (track.enabled = myStream.cam))
    }
  }, [myStream.cam])


  // メタバースかカメラ映像かを選択する
  const ScreenSwitch = () => {
    setScreen(screen == "metaverse" ? "video" : "metaverse")
  };

  if (!ready) return (<></>)

  return (
    <>
      <Modal localStream={localStream} cam={myStream.cam} />

      <Link to="/">
        <button className="aspect-square h-12 mr-4 mt-4 fixed z-50 top-0 right-0">
          <img src={LeaveStream} className="h-full object-cover" />
        </button>
      </Link>

      <div className="h-10 mb-4 px-4 w-full fixed z-50 bottom-0 flex flex-row justify-around">
        <label htmlFor="setting-modal" className="aspect-square h-full flex items-center rounded-full justify-center bg-white bg-opacity-75 mx-1">
          <img src={Setting} className="h-full object-cover h-2/3 w-2/3" />
        </label>

        <div className="w-full px-6">
          <Send socket={socket} />
        </div>

        <button className="aspect-square h-full flex items-center justify-center rounded-full bg-white bg-opacity-75 mx-1" onClick={MuteSwitch}>
          <img src={myStream.mic ? Mic : MicInactive} className="h-full object-cover h-5/6 w-5/6" />
        </button>

        <button className="aspect-square h-full flex items-center justify-center rounded-full bg-white bg-opacity-75 mx-1" onClick={CameraSwitch}>
          <img src={myStream.cam ? Cam : CamInactive} className="h-full object-contain h-3/4 w-3/4" />
        </button>
      </div>

      <div className="h-40 sm:h-2/5 mb-4 sm:mx-4 fixed z-50 bottom-16 w-full sm:w-64 xl:w-96 right-0 sm:bg-yellow-100 sm:bg-opacity-50 rounded-xl">
        <Chat socket={socket} />
      </div>

      <button className="aspect-square h-24 ml-4 mt-4 fixed z-50 top-0 left-0" onClick={ScreenSwitch}>
        <img src="https://appleenglish.jp/wp-content/uploads/2020/11/ECF9852A-03F8-4F76-9301-414D6C84D745.jpeg" className="h-full object-cover" />
      </button>

      {screen == "video" ? <Video remoteVideo={remoteVideo} stream={stream} myStream={myStream} /> : <Metaverse socket={socket} />}

    </>
  );
};

export default Room;