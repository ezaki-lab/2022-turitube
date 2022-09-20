import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';

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
  if (isStreamer)
    return (
      <>
        <div className={`flex flex-${width > height ? "row" : "col"} h-full w-full`}>

          {/*退出ボタン */}
          <button className="fixed top-1 left-2 bg-yellow-200 w-12 h-12">

          </button>

          {/*メタバース画面 */}
          <div className={`aspect-square ${width > height ? "h-full max-w-[55%]" : "w-full max-h-[55%]"} bg-white flex justify-center items-center`}>
            <div className={`aspect-square ${width > height ? "w-full" : "h-full"} bg-blue-200`}>

            </div>
          </div>

          {/*チャット欄 */}
          <div className={`bg-yellow-200 flex-auto flex flex-col items-center ${width > height ? "w-2 h-full pt-12" : "h-2 w-full"}`}>
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
          </div>

        </div>
      </>
    )

  // 視聴者ならこっち
  else return (
    <>
      <div className={`flex flex-${width > height ? "row" : "col"} h-full w-full`}>
        <button className="fixed top-1 left-2 bg-yellow-200 w-12 h-12">

        </button>
        <div className={`aspect-square ${width > height ? "h-full max-w-[50%]" : "w-full max-h-[50%]"} bg-white flex justify-center items-center`}>
          <div className={`aspect-square ${width > height ? "w-full" : "h-full"} bg-blue-200`}>

          </div>
        </div>
        <div className={`bg-yellow-200 flex-auto flex flex-col items-center ${width > height ? "w-2 h-full pt-12" : "h-2 w-full"}`}>
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
          <div className="h-12 w-full bg-green-200 flex items-center p-1">
            <input type="text" placeholder="コメントを入力" className="w-10 h-full rounded-full px-2 flex-auto" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNvy7VzbX0PZ3AX-8RvtnR0OvqMoEYGl3vJQ&usqp=CAU" className="h-full px-1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Room;