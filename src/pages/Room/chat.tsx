import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import Icon from '../../components/Icon';
import useUserData from '../../hooks/useUserData';
import ScrollToBottom from 'react-scroll-to-bottom';

interface Message {
  user_name: string,
  text: string,
  user_type: string,
  type: string
}

// Room チャット管理コンポーネント
const Chat = ({ socket }) => {
  const [data, setData] = useState<Message[]>([]);

  useEffect(() => {
    if (socket) {
      // チャット送信時
      socket.on('chat', (data) => {
        setData((rev) => ([...rev, {
          user_name: data.user_name,
          text: data.text,
          user_type: "listener",
          type: "chat"
        },]))
      })

      // 退室時
      socket.on('leave', (data) => {
        setData((rev) => ([...rev, {
          user_name: data.user_name,
          text: "退室しました",
          user_type: data.user_type,
          type: "leave"
        }]))
      })

      // 入室時
      socket.on('join', (data) => {
        setData((rev) => ([...rev, {
          user_name: data.user_name,
          text: "入室しました",
          user_type: data.user_type,
          type: "join"
        }]))
      })

    }
  }, [socket]);

  // チャット
  return (
    <div className="h-2 flex-auto w-full">
      <ScrollToBottom>
        <ul className="w-full p-2 space-y-2">
          {data.map((d, index) => {
            return (
              <div key={index}>
                {d.type == "chat" ? <Message data={d} /> : <></>}
                {d.type == "leave" ? <Leave data={d} /> : <></>}
                {d.type == "join" ? <Join data={d} /> : <></>}
              </div>
            )
          })}
        </ul>
      </ScrollToBottom>
    </div>

  );
};

const Message = ({ data }) => {
  const userData = useUserData(data.user_name);
  if (!userData) return (<></>)
  return (
    <li className="h-10 w-full bg-white bg-opacity-75 rounded-full flex items-center drop-shadow-md">
      <Icon data={userData} />
      <div className="flex flex-col justify-center px-2">
        <p className="text-tcolor text-xs line-clamp-2">{userData.screen_name}</p>
        <p className="text-tcolor text-xs line-clamp-2">Lv.{userData.lv}</p>
      </div>
      <p className="text-sm text-tcolor pr-1 w-2 flex-auto line-clamp-2">{data.text}</p>

    </li>
  )
}

const Leave = ({ data }) => {
  const userData = useUserData(data.user_name);
  if (!userData) return (<></>)
  return (
    <>
      <li className="h-10 w-full bg-red-400 bg-opacity-50 rounded-full flex items-center drop-shadow-md">
      <Icon data={userData} />
      <p className="text-sm text-white font-bold pr-1 pl-2 w-2 flex-auto line-clamp-2">{data.user_type=="streamer" ? "<配信> " : "<視聴> "}{userData.screen_name}が退室しました</p>
    </li>
    </>
  )
}

const Join = ({ data }) => {
  const userData = useUserData(data.user_name);
  if (!userData) return (<></>)
  return (
    <>
      <li className="h-10 w-full bg-basic bg-opacity-75 rounded-full flex items-center drop-shadow-md">
      <Icon data={userData} />
      <p className="text-sm text-white font-bold pr-1 pl-2 w-2 flex-auto line-clamp-2">{data.user_type=="streamer" ? "<配信> " : "<視聴> "}{userData.screen_name}が入室しました</p>
    </li>
    </>
  )
}

export default Chat;