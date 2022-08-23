/*  Room/stream */
import React, { useEffect, useState, createContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RemoteVideo from './Video';
import Metaverse from './Metaverse';
import Modal from './modal';
import Audio from './audio';

import LeaveStream from "../../img/icons/leave_stream.png";
import Send from './send';
import Chat from './chat';

import useSocketIo from '../../hooks/useSocketIo';
import useMyStream from '../../hooks/useMyStream';
import useRemoteStream from '../../hooks/useRemoteStream';

import Mic from '../../img/icons/mic.active.png';
import MicInactive from '../../img/icons/mic.inactive.png';
import Cam from '../../img/icons/camera.active.png';
import CamInactive from '../../img/icons/camera.inactive.png';
import Setting from '../../img/icons/setting.png';


import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

import { useSkyWay } from '../../hooks/useSkyWay';

// 配信画面
const Room = () => {
  const navigate = useNavigate();

  const [ready, setReady] = useState<boolean>(false);
  const [screen, setScreen] = useState<string>("metaverse"); // デフォルトではmetaverse
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

  const { room_id } = useParams();
  const socket = useSocketIo('stream');

  // 自分自身のストリーム管理
  const { myStream, setMyStream } = useMyStream(room_id, socket);
  const { remoteStream } = useRemoteStream(socket)

  const { remoteVideo, localStream, room } = useSkyWay(room_id, setMyStream, myStream);


  useEffect(() => {
    setTimeout(() => {
      setReady(true);
      setMyStream((rev) => ({
        ...rev,
        loading: false
      }));
    }, 2000);
  }, []);

  useEffect(() => {
    setMyStream((rev) => ({
      ...rev,
      screen_name: userInfo.screen_name,
      user_name: userInfo.user_name,
      avatar: userInfo.avatar
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
          screen_name: userInfo.screen_name,
          avatar: userInfo.avatar
        });
        setMyStream((rev) => ({
          ...rev,
          sid: socket.id
        }))
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
  };

  useEffect(() => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => (track.enabled = myStream.mic));
      localStream.current.getVideoTracks().forEach((track) => (track.enabled = myStream.cam));
    }
  }, [myStream.mic, myStream.cam]);

  const leaveRoom = () => {
    navigate("/")
    room.close();
    localStream.current.getTracks().forEach(track => track.stop());
  }

  // メタバースかカメラ映像かを選択する
  const ScreenSwitch = () => {
    setScreen(screen == "metaverse" ? "video" : "metaverse")
  };

  if (!ready) return (<></>)

  return (
    <>
      <Modal localStream={localStream} cam={myStream.cam} />

      <button className="aspect-square h-12 mr-4 mt-4 fixed z-50 top-0 right-0" onClick={leaveRoom}>
        <img src={LeaveStream} className="h-full object-cover" />
      </button>

      <div className="h-10 mb-4 px-2 w-full fixed z-50 bottom-0 flex flex-row justify-around">
        <label htmlFor="setting-modal" className="aspect-square h-full flex items-center rounded-full justify-center bg-white bg-opacity-75 mx-1">
          <img src={Setting} className="h-full object-cover h-2/3 w-2/3" />
        </label>

        <div className="w-full px-2">
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

      <Audio remoteVideo={remoteVideo} />

      {screen == "video" ? <RemoteVideo remoteVideo={remoteVideo} remoteStream={remoteStream} /> : <Metaverse setMyStream={setMyStream} myStream={myStream}  remoteStream={remoteStream} />}

    </>
  );
};

export default Room;