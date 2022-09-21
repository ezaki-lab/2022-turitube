import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';

// Room チャット管理コンポーネント
const Chat = () => {
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

  // 視聴者ならこっち
  return (
    <div className="h-2 flex-auto w-full">
      <ScrollToBottom>
        <ul className="w-full p-2 space-y-2">
          {messageList.map((data, index) => {
            return (
              <li className="h-10 w-full bg-white rounded-full flex items-center" key={index}>
                <img src={data.icon} className="h-full aspect-square object-cover rounded-full" />
                <div className="flex flex-col justify-center px-2">
                  <p className="text-tcolor text-xs">{data.screen_name}</p>
                  <p className="text-tcolor text-xs">Lv.{data.lv}</p>
                </div>
                <p className="text-sm text-tcolor line-clamp-2 pr-1">{data.text}</p>

              </li>
            )
          })}
        </ul>
      </ScrollToBottom>
    </div>

  );
};

export default Chat;