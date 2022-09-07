// 強制終了時に表示する項目
import { useRecoilState } from 'recoil';
import React, {useEffect} from 'react';

// Home - index.tsx
const Coercion = () => {

  useEffect(() => {
    ;
  }, [])
  
  return (
    <>
      a
    </>
  );
};

const ModalText = ({ text, textColor="" }) => {
    return (
      <p className={`font-bold py-1 ${textColor}`}>{text}</p>
    )
  }

export default Coercion;