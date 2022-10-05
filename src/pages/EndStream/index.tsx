import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../common/atom';
import SaveDiary from "./savediary";
import SavePictureBook from "./savePictureBook";
import First from './first';
import { useParams } from 'react-router-dom';


// 配信終了時に遷移する画面
const EndStream = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [next, setNext] = useState<number>(0);
  const { room_id } = useParams();

  useEffect(() => {
    ;
  }, []);

  return (
    <>
      {next == 0 ? <First setNext={setNext} room_id={room_id} /> : <></>}
      {next == 1 ? <SaveDiary setNext={setNext} /> : <></>}
      {next == 2 ? <SavePictureBook /> : <></>}
    </>
  );
}

export default EndStream;