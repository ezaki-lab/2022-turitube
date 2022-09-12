// 強制終了時に表示する項目
import { useRecoilState } from 'recoil';
import React, {useEffect} from 'react';

// 強制終了時の画面
const Coercion = () => {

  useEffect(() => {
    ;
  }, []);
  
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <p className="text-xl font-bold text-basic py-1">配信が終了しました</p>
      </div>
    </>
  );
};

const ModalText = ({ text, textColor="" }) => {
    return (
      <p className={`font-bold py-1 ${textColor}`}>{text}</p>
    )
  }

export default Coercion;