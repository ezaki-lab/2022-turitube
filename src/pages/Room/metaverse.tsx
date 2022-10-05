import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import { Stage, Layer, Group, Rect, Circle, Image, Text } from 'react-konva';
import * as atom from '../../common/atom';
import useImage from 'use-image';
import useWindowSize from '../../hooks/useWindowSize';
import useResizeObserver from '../../hooks/useResizeObserver';

import BackGround from '../../img/metaverse_background.png';

// メタバース画面
const Metaverse = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [backgroundImage] = useImage(BackGround);
  const canvasSizeRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  const handleResize = (entries) => {
    const width = entries[0].contentRect.width;
    setRange(Math.floor(width))
  }

  useResizeObserver([canvasSizeRef], handleResize);

  return (
    <>
      <div ref={canvasSizeRef} className={`h-full w-full`}>
        {canvasSizeRef.current
          ? <Stage width={range} height={range}>
            {/*背景を表示するレイヤー */}
            <Layer>
              <Image image={backgroundImage} x={0} y={0} width={range} height={range} />
            </Layer>
          </Stage>
          : <></>}
      </div>
    </>
  )
};

export default Metaverse;