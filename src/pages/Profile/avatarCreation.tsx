import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import { Stage, Layer, Rect, Circle, Image } from 'react-konva';
import Avatar from '../../components/Avatar';
import { hats, hairs, faces, bodies, pantses, foots } from '../../components/Avatar/avatarLoad';

interface AvatarData {
  hat: number,
  hair: number,
  face: number,
  body: number,
  pants: number,
  foot: number
}

// アバター作成をするコンポーネント
// アバターは縦横比3:2
const AvatarCreate = () => {

  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);
  const [avatarData, setAvatarData] = useState<AvatarData>(userInfo.avatar);

  // アバター情報は適時書き込まれる
  useEffect(() => {
    setUserInfo({ ...userInfo, avatar: avatarData })
  }, [avatarData]);

  const size = 100;

  return (
    <>
    {/*こうしないとアバターを使うことができない */}
      <Stage width={size} height={size * 1.5}>
        <Layer>
          <Avatar avatarData={avatarData} size={size} />
        </Layer>
      </Stage>

      <SelectParts setAvatarData={setAvatarData} imgs={hats} type={"hat"} text={"帽子"} key={1} />
      <SelectParts setAvatarData={setAvatarData} imgs={hairs} type={"hair"} text={"髪"} key={2} />
      <SelectParts setAvatarData={setAvatarData} imgs={faces} type={"face"} text={"顔"} key={3} />
      <SelectParts setAvatarData={setAvatarData} imgs={bodies} type={"body"} text={"体"} key={4} />
      <SelectParts setAvatarData={setAvatarData} imgs={pantses} type={"pants"} text={"腰"} key={5} />
      <SelectParts setAvatarData={setAvatarData} imgs={foots} type={"foot"} text={"足"} key={6} />
    </>
  )
};

// アバターのパーツを選択するコンポーネント
// 選択されたものは自動的に書き込まれる
const SelectParts = ({ setAvatarData, imgs, type, text }) => {
  return (
    <>
      <div className="flex w-full justify-start items-center bg-basic px-4 rounded-2xl my-2">
        <h2 className="text-xl font-bold pr-4 w-20 text-white">{text}</h2>
        <ul className="flex overflow-x-auto w-3/5 h-20 justify-start items-center">
          {imgs.map((img, index) => {
            return (
              <li className="w-16 flex-none" key={index}>
                <button className="w-12 h-16 bg-white rounded-lg flex items-center justify-center" onClick={() => setAvatarData((rev) => ({ ...rev, [type]: index }))}>
                  <img src={img} className="w-8 h-12" />
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default AvatarCreate;