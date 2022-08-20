// メタバース画面
import React, { useEffect, useState, useRef } from 'react';
import Shrink from '../../../img/icons/shrink.png';
import { Stage, Layer, Rect, Circle, Image } from 'react-konva';
import BackGround from '../../../img/metaverse_background.png';
import useImage from 'use-image';

// 座標系について - 横をx,縦をyとし、0~1の範囲で座標情報を正規化する
const Metaverse = ({socket}) => {
  // 画面幅の小さいほうをrangeとする
  const range = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;

  const [a, setA] = useState([200]);
  const [pos, setPos] = useState([{ x: 0.2 * range, y: 0.2 * range }]);
  const [myPos, setMyPos] = useState({ x: 0.2 * range, y: 0.2 * range })

  // 自分の座標を送信
  useEffect(() => {
    ;
  }, [myPos]);

  const [backgroundImage] = useImage(BackGround);

  return (
    <>
      <div className="w-full h-full bg-basic bg-opacity-50 flex flex-col justify-start items-center top-0 fixed">
        <Stage width={range} height={range}>
          <Layer>
            <Image image={backgroundImage} x={0} y={0} width={range} height={range} />
          </Layer>
          <Layer>
            {pos.map((p, index) => (
              <Circle x={p.x} y={p.y} stroke="black" radius={50} key={index} />
            ))}
            <Circle x={myPos.x} y={myPos.y} stroke="red" radius={30} draggable onDragEnd={(e) => {
              setMyPos({
                x: e.target.x(),
                y: e.target.y()
              })
            }}
            />
          </Layer>
        </Stage>
      </div>
    </>
  )
};

export default Metaverse;