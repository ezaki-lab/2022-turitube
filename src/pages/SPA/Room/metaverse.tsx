import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';
import Chat from './chat';

// Room 視聴者視点の画面
const Listener = () => {
  const [user, setUser] = useRecoilState(atom.user_info);
  const [width, height] = useWindowSize();
  const [isStreamer, setIsStreamer] = useState<boolean>(true);

  useEffect(() => {
    ;
  }, []);

  // メタバース画面
  return (
    <>
      {/*メタバース画面 */}
      <div className={`aspect-square ${width > height ? "w-full" : "h-full"} bg-blue-200`}>

      </div>
    </>
  );
};

export default Listener;