// メタバース画面
import React, { useEffect, useState, useRef } from 'react';
import Shrink from '../../../img/icons/shrink.png';
import { Stage, Layer, Group, Rect, Circle, Image } from 'react-konva';
import Avatar from '../../../components/Avatar';
import BackGround from '../../../img/metaverse_background.png';
import useImage from 'use-image';
import { useRecoilState } from 'recoil';
import * as atom from '../../../common/atom';

// 座標系について - 横をx,縦をyとし、0~1の範囲で座標情報を正規化する
const Metaverse = ({ setMyStream, myStream, remoteStream }) => {
  // 画面幅の小さいほうをrangeとする
  const range = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);
  const [backgroundImage] = useImage(BackGround);

  return (
    <>
      <div className="w-full h-full bg-basic bg-opacity-50 flex flex-col justify-start items-center top-0 fixed">
        <Stage width={range} height={range}>
          {/*背景を表示するレイヤー */}
          <Layer>
            <Image image={backgroundImage} x={0} y={0} width={range} height={range} />
          </Layer>

          {/*アバターを表示するレイヤー */}
          <Layer>
            {/*他の参加者全員のアバターを表示する */}
            {remoteStream.users.map((user, index) => {
              return (
                <Group x={user.pos_x * range} y={user.pos_y * range}>
                  <Avatar avatarData={user.avatar} size={range/10} />
                </Group>
              )
            })}

            {/*自分のアバターを表示する */}
            <Group x={myStream.pos_x * range} y={myStream.pos_y * range} draggable onDragMove={(e) => {
              // 自分の座標を送信
              setMyStream((prev) => ({
                ...prev,
                pos_x: e.target.x() / range,
                pos_y: e.target.y() / range
              }))
            }}>
              <Avatar avatarData={userInfo.avatar} size={range/10} />
            </Group>
          </Layer>
          
        </Stage>
      </div>
    </>
  )
};

export default Metaverse;