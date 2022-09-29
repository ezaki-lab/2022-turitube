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
  text: string
}

// Room チャット管理コンポーネント
const Chat = ({ socket }) => {
  const [data, setData] = useState<Message[]>([]);

  useEffect(() => {
    if (socket) {
      socket.on('chat', (data) => {
        setData((rev) => ([...rev, {
          user_name: data.user_name,
          text: data.text
        },]))
      })
    }
  }, [socket]);

  // 視聴者ならこっち
  return (
    <div className="h-2 flex-auto w-full">
      <ScrollToBottom>
        <ul className="w-full p-2 space-y-2">
          {data.map((d, index) => (
            <Message data={d} key={index} />
          ))}
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
      <div className="flex flex-col justify-center px-2 w-20">
        <p className="text-tcolor text-xs line-clamp-2">{userData.screen_name}</p>
        <p className="text-tcolor text-xs line-clamp-2">Lv.{userData.lv}</p>
      </div>
      <p className="text-sm text-tcolor pr-1 w-2 flex-auto truncate">{data.text}</p>

    </li>
  )
}

export default Chat;