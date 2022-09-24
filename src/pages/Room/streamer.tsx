import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';
import Chat from './chat';
import Metaverse from './metaverse';

// Room 配信者視点の画面
const Streamer = () => {
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
  return (
    <>
      <div className={`flex flex-${width > height ? "row" : "col"} h-full w-full`}>

        {/*退出ボタン */}
        <button className="fixed top-1 left-2 bg-yellow-200 w-12 h-12">

        </button>

        {/*メタバース画面 */}
        <div className={`aspect-square ${width > height ? "h-full max-w-[55%]" : "w-full max-h-[55%]"} bg-white flex justify-center items-center`}>
          <Metaverse />
        </div>

        {/*チャット欄 */}
        <div className={`bg-yellow-200 flex-auto flex flex-col items-center ${width > height ? "w-2 h-full pt-12" : "h-2 w-full"}`}>
          <Chat />
        </div>

      </div>
    </>
  )
};

export default Streamer;