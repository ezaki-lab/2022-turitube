import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';
import Streamer from './streamer';
import Listener from './listener';

// Room 配信部屋
const Room = () => {
  const [user, setUser] = useRecoilState(atom.user_info);
  const [width, height] = useWindowSize();
  const [isStreamer, setIsStreamer] = useState<boolean>(true);

  useEffect(() => {
    ;
  }, []);

  const messageList = [{
    icon: "https://magazine.coconala.com/wp-content/uploads/2019/09/shutterstock_116146678.jpg",
    screen_name: "kosakae",
    lv: 20,
    text: "こんにちは",
  },
  {
    icon: "https://magazine.coconala.com/wp-content/uploads/2019/09/shutterstock_116146678.jpg",
    screen_name: "kosakae",
    lv: 20,
    text: "こんにちはｄｓｌｋｊｆｋｌｊｄさｊｋｌｆ；ｓだｌｋ；ｆｌｊｋ；あｓｄｆｌｊｋ；さｄｊｌｋｆｊｋｌｄ；さｆｊｌ；ｋｄさｆ",
  },]

  // 配信者ならこっち
  if (isStreamer) return (<Streamer />);
  else return (<Listener />)
}

export default Room;