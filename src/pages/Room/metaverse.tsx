import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Group, Rect, Circle, Image, Text } from 'react-konva';
import * as atom from '../../common/atom';
import useImage from 'use-image';
import useWindowSize from '../../hooks/useWindowSize';
import useResizeObserver from '../../hooks/useResizeObserver';

import BackGround from '../../img/metaverse_background2.png';
import Avatar from '../../components/Avatar';
import useUserData from '../../hooks/useUserData';

const POSITION_LIST = [
  {
    x: 0.6,
    y: 0.3
  },
  {
    x: 0.3,
    y: 0.35
  },
  {
    x: 0.45,
    y: 0.33
  },
  {
    x: 0.15,
    y: 0.32
  },
  {
    x: 0.8,
    y: 0.31
  },
]

// メタバース画面
const Metaverse = ({ multiStream }) => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [backgroundImage] = useImage(BackGround);
  const canvasSizeRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  const handleResize = (entries) => {
    const width = entries[0].contentRect.width;
    setRange(Math.floor(width))
  }

  useResizeObserver([canvasSizeRef], handleResize);

  useEffect(() => {
    console.log(Object.keys(multiStream))
  }, [multiStream]);

  if (!multiStream) return (<></>)
  return (
    <>
      <div ref={canvasSizeRef} className={`h-full w-full`}>
        {canvasSizeRef.current
          ? <Stage width={range} height={range}>
            {/*背景を表示するレイヤー */}
            <Layer>
              <Image image={backgroundImage} x={0} y={0} width={range} height={range} />
            </Layer>

            {/*アバターを表示するレイヤー */}
            <Layer>
              {Object.keys(multiStream.streamer).map((key, index) => {
                return (
                  <AvatarView user_name={key} face={multiStream.streamer[key].face} range={range} index={index} key={key} />
                )
              })}
            </Layer>
          </Stage>
          : <></>}
      </div>
    </>
  )
};

const AvatarView = ({ user_name, face, range, index }) => {

  useEffect(() => {
    console.log(range);
  }, [range]);

  const userData = useUserData(user_name);
  if (!userData) return (<></>)
  return (
    <>
      <Group x={POSITION_LIST[index].x * range} y={POSITION_LIST[index].y * range} height={(range / 10) * 3} width={(range / 10 * 2)}>
        <Avatar avatarData={userData.avatar} size={(range / 10 * 2)} face={face}/>
      </Group>
    </>
  )
}



export default Metaverse;