/*  Room/stream */
import React, { useEffect, useState, createContext, useRef } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import RemoteVideo from './Video';
import Metaverse from './Metaverse';

import SettingModal from './Modal/settingModal';
import CloseModal from './Modal/closeModal';
import PhotographModal from './Modal/photographModal';
import UsersModal from './Modal/usersModal';

import RecordFish from './recordFish';

import Audio from './audio';

import LeaveStream from "../../img/icons/leave_stream.png";
import Send from './send';
import Chat from './chat';

import QuestBoard from '../../components/QuestBoard';
import Menu from './menu';

import useSocketIo from '../../hooks/useSocketIo';
import useMyStream from '../../hooks/useMyStream';
import useRemoteStream from '../../hooks/useRemoteStream';
import useCamera from '../../hooks/useCamera';
import { UseRecognitionCamera } from '../../hooks/useRecognitionCamera';
import { useGetPosition } from '../../hooks/useGetPosition';

import Mic from '../../img/icons/mic.active.png';
import MicInactive from '../../img/icons/mic.inactive.png';
import Cam from '../../img/icons/camera.active.png';
import CamInactive from '../../img/icons/camera.inactive.png';
import Setting from '../../img/icons/setting.png';
import Hamburger from '../../img/icons/hamburger.png';
import QuestOpen from '../../img/icons/quest_fish_open.png';

import toggleMetaverseImg from '../../img/metaverse_background.png';
import kariImg from '../../img/kari.jpg';

import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

import { useSkyWay } from '../../hooks/useSkyWay';

// 配信画面
const Room = () => {
  const navigate = useNavigate();

  const [ready, setReady] = useState<boolean>(false);
  const [screen, setScreen] = useState<string>("metaverse"); // デフォルトではmetaverse
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);
  const [roomId, setRoomId] = useRecoilState(atom.current_room_id);
  const [photographFlag, setPhotographFlag] = useState<boolean>(false);
  const [detectionResult, setDetectionResult] = useState<null|{}>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const { localStream, readyCam, setConstraints } = useCamera({ audio: false, video: false }, "enviroment");

  const { room_id } = useParams();
  const socket = useSocketIo('stream');

  // 自分自身のストリーム管理
  const { myStream, setMyStream } = useMyStream(room_id, socket);
  const { remoteStream } = useRemoteStream(socket);

  const { remoteVideo, room } = useSkyWay(room_id, setMyStream, myStream, localStream, readyCam);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
      setMyStream((rev) => ({
        ...rev,
        loading: false
      }));
      setRoomId(room_id);
    }, 500);
  }, []);

  useEffect(() => {
    setMyStream((rev) => ({
      ...rev,
      screen_name: userInfo.screen_name,
      user_name: userInfo.user_name,
      avatar: userInfo.avatar
    }));
  }, [userInfo]);

  // 再読み込み対策
  window.addEventListener('beforeunload', (e) => {
    socket.disconnect();
    room.close();
  });

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

      // is_hostとis_streamerを受け取る
      socket.on('init_user_setting', (data) => {
        setMyStream((rev) => ({
          ...rev,
          is_host: data.is_host,
          is_streamer: data.is_streamer,
        }))
      })

      // 誰かが抜けたときの処理
      socket.on("disconnect_others", (data) => {
        // 表示上の削除を行う(というか再レンダリング)
      })

      // 強制終了
      socket.on("deleted_room", () => {
        navigate("/coercion");
      })
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
    setConstraints({ video: myStream.cam, audio: myStream.mic });
  }, [myStream.mic, myStream.cam]);

  const leaveRoom = () => {
    navigate("/result")
  }

  // メタバースかカメラ映像かを選択する
  const ScreenSwitch = () => {
    setScreen(screen == "metaverse" ? "video" : "metaverse")
  };

  if (!ready) return (<></>)

  return (
    <>
      {/* */}
      <SettingModal cam={myStream.cam} localStream={localStream} readyCam={readyCam} />
      <CloseModal myStream={myStream} leaveRoom={leaveRoom} />
      <PhotographModal setPhotoGraphFlag={setPhotographFlag} photoGraphFlag={photographFlag} room_id={room_id} localStream={localStream} readyCam={readyCam} setDetectionResult={setDetectionResult} />
      <UsersModal myStream={myStream} remoteStream={remoteStream} />
      <QuestBoard can_order_quest={false} />
      <RecordFish detectionResult={detectionResult} />
      <Menu visible={menuVisible} />

      {/* 撮影フラグはこれで立てる */}
      {/*<button className="btn fixed z-100" onClick={() => { setPhotographFlag(true) }}>撮影</button>*/}

      <label htmlFor="close-modal" className="aspect-square h-12 mr-4 mt-4 fixed z-50 top-0 right-0">
        <img src={LeaveStream} className="h-full object-cover" />
      </label>

      <div className="h-10 mb-4 px-2 w-full fixed z-50 bottom-0 flex flex-row justify-around">
        <button className="aspect-square h-full flex items-center rounded-full justify-center bg-white bg-opacity-75 mx-1" onClick={() => {setMenuVisible((rev) => (!rev))}} key={100}>
          <img src={Hamburger} className="h-full object-cover aspect-square h-2/3 w-2/3" />
        </button>
        
        <label htmlFor="questboard-modal" className="aspect-square h-full flex items-center rounded-full justify-center bg-white bg-opacity-75 mx-1">
          <img src={QuestOpen} className="h-full object-cover h-5/6 w-5/6" />
        </label>

        <div className="w-full px-2">
          <Send socket={socket} />
        </div>
        {
          myStream.is_streamer
            ? (<>
              <button className="aspect-square h-full flex items-center justify-center rounded-full bg-white bg-opacity-75 mx-1" onClick={MuteSwitch}>
                <img src={myStream.mic ? Mic : MicInactive} className="h-full object-cover h-5/6 w-5/6" />
              </button>

              <button className="aspect-square h-full flex items-center justify-center rounded-full bg-white bg-opacity-75 mx-1" onClick={CameraSwitch}>
                <img src={myStream.cam ? Cam : CamInactive} className="h-full object-contain h-3/4 w-3/4" />
              </button>
            </>)
            : (<>
              <button className="btn bg-basic border-basic h-full" onClick={() => { setMyStream((rev) => ({ ...rev, is_streamer: true })) }}>配信者になる</button>
            </>)
        }
      </div>

      <div className="h-40 sm:h-2/5 mb-4 sm:mx-4 fixed z-50 bottom-16 w-full sm:w-64 xl:w-96 right-0 sm:bg-yellow-100 sm:bg-opacity-50 rounded-xl">
        <Chat socket={socket} />
      </div>

      <button className="aspect-square h-24 ml-4 mt-4 fixed z-50 top-0 left-0" onClick={ScreenSwitch}>
        {/*<img src="https://appleenglish.jp/wp-content/uploads/2020/11/ECF9852A-03F8-4F76-9301-414D6C84D745.jpeg" className="h-full object-cover" />*/}
        {screen == "video" ? <img src={toggleMetaverseImg} className="h-full object-cover rounded-xl" /> : <img src={kariImg} className="h-full object-cover rounded-xl" />}
      </button>

      <Audio remoteVideo={remoteVideo} />

      {screen == "video" ? <RemoteVideo remoteVideo={remoteVideo} remoteStream={remoteStream} /> : <Metaverse setMyStream={setMyStream} myStream={myStream} remoteStream={remoteStream} />}

      {/*imgStrings.length ? <img src={imgStrings[0]} className="z-100 fixed h-32 object-contain" /> : <></>*/}
    </>
  );
};

export default Room;