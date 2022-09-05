// メタバース画面
import React, { useEffect, useState, useRef } from 'react';
import Shrink from '../../../img/icons/shrink.png';
import { Stage, Layer, Group, Rect, Circle, Image, Text } from 'react-konva';
import Avatar from '../../../components/Avatar';
import BackGround from '../../../img/metaverse_background.png';
import Camera from '../../../img/icons/camera.red.png';
import Speaker from '../../../img/icons/speaker.red.png';

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
                <Group x={user.pos_x * range} y={user.pos_y * range} height={(range / 10) * 2.7} width={(range / 10 * 2)}>
                  {/*<Rect x={0} y={0} height={(range / 10) * 2.2} width={(range / 10 * 2)} stroke="green" />*/}
                  <MetaUser range={range} user={user} />
                </Group>
              )
            })}

            {/*自分のアバターを表示する */}
            <Group x={myStream.pos_x * range} y={myStream.pos_y * range} height={(range / 10) * 2.7} width={(range / 10 * 2)} draggable onDragMove={(e) => {
              // 自分の座標を送信
              setMyStream((prev) => ({
                ...prev,
                pos_x: e.target.x() / range,
                pos_y: e.target.y() / range
              }))
            }}>
              <MetaUser range={range} user={myStream} />
            </Group>
          </Layer>

        </Stage>
      </div>
    </>
  )
};

const MetaUser = ({ range, user }) => {
  const [cameraImage] = useImage(Camera);
  const [speakerImage] = useImage(Speaker);
  return (
    <>
      <Group height={(range / 50 * 2)} width={(range / 10 * 2)} verticalAlign={"top"}>
        <Rect x={0} y={0} height={(range / 50 * 2)} width={(range / 10 * 2)} fill={"black"} cornerRadius={(999)} opacity={0.4} />
        <Text text={user.screen_name} fontSize={range / 50} fontFamily={'Hiragino Kaku Gothic ProN'} fill={'white'} align={"center"} verticalAlign={"middle"} width={(range / 10) * 2} height={(range / 50 * 2)} />
      </Group>

      <Group height={(range / 50 * 2)} width={(range / 10 * 2)} offsetY={-(range / 50 * 2)}>
        {user.mic ? <Image offsetY={-(range / 50) * 0.05} offsetX={-(range / 10) * 0.6} width={(range / 50 * 2)} height={(range / 50 * 2)} image={speakerImage} /> : <></>}
        {user.cam ? <Image offsetY={-(range / 50) * 0.05} offsetX={-(range / 10) * 1.1} width={(range / 50 * 2)} height={(range / 50 * 2)} image={cameraImage} /> : <></>}
      </Group>

      <Group verticalAlign={"bottom"} width={range / 10} height={(range / 10 * 1.5)} offsetX={-(range / 20)} offsetY={-(range / 10 * 0.9)}>
        {/*<Rect x={0} y={0} width={range / 10} height={(range / 10 * 1.5)} stroke="red" />*/}
        <Avatar avatarData={user.avatar} size={range / 10} />
      </Group>
    </>

  )
}

export default Metaverse;