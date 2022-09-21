import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';
import Chat from './chat';

// Room メタバース画面
const Metaverse = () => {
  const [user, setUser] = useRecoilState(atom.user_info);
  const [width, height] = useWindowSize();
  const [isStreamer, setIsStreamer] = useState<boolean>(true);

  // メタバース画面
  return (
    <div className={`aspect-square ${width > height ? "w-full" : "h-full"} bg-blue-200 flex justify-center items-center`}>
        メタバース
    </div>
  );
};

export default Metaverse;