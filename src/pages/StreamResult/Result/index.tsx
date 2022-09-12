import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import axios from 'axios';

interface ImgName {
  img_name: string
}

// Result - index.tsx 配信終了後の記録画面
const Result = () => {
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);
  const [imgNameList, setImgNameList] = useState<ImgName[]>([]);
  const [roomId, setRoomId] = useRecoilState(atom.current_room_id);
  const base_url = "https://ezaki-lab.cloud/~turitube/api/stream_photo";

  useEffect(() => {
    axios.get(base_url, {
      params: {
        user_id: userInfo.user_id,
        room_id: roomId
      }
    }).then((res) => {
      console.log(res.data.img_name_list)
      setImgNameList(res.data.img_name_list);
    })
  }, []);

  useEffect(() => {
    console.log(roomId);
  }, [roomId]);

  return (
    <>
      <div className="flex w-full justify-start items-center bg-basic px-4 rounded-2xl my-2">
        <h2 className="text-xl font-bold pr-4 w-20 text-white">画像選択</h2>
        <ul className="flex overflow-x-auto w-3/5 h-48 justify-start items-center">
          {imgNameList.map((img, index) => {
            console.log(img)
            return (
              <li className="w-16 flex-none" key={index}>
                <button className="w-40 h-40 bg-white rounded-lg flex items-center justify-center">
                  <img src={"https://ezaki-lab.cloud/~turitube/api/img/stream_photo/" + img.img_name} className="h-32 object-contain" />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
};

export default Result;