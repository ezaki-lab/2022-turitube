// メタバース画面
import React, { useEffect, useState } from 'react';
import Shrink from '../../../img/icons/shrink.png';
import { Stage, Layer, Rect, Circle } from 'react-konva';

// konvaは絶対座標系
const Metaverse = () => {
  const [a, setA] = useState([200])

  const addA = () => {
    setA([...a, 100]);
    console.log(a);
  }

  return (  
    <>
      <div className="w-full h-full bg-red-200 bg-opacity-50 flex flex-col justify-start fixed z-0">
        <Stage width={window.innerWidth} height={window.innerHeight} draggable>
          <Layer>
            {a.map((k, index) => (
              <Circle x={k} y={k} stroke="black" radius={50} />
            ))}
          </Layer>
        </Stage>
      </div>
      <button onClick={addA} className="mt-64 fixed z-1">
          追加   
      </button>
    </>
  )
};

export default Metaverse;