/*  User */
import { useRecoilState } from 'recoil';
import React, { useState, useEffect, useRef } from 'react';
import Chat from './chat';
import * as atom from '../../common/atom';
import { useGetPosition } from '../../hooks/useGetPosition';
import useCamera from '../../hooks/useCamera';

// ユーザーページ
const Map = () => {

  const { lat, lng } = useGetPosition();
  const localStream = useRef<MediaStream>();
  const videoRef1 = useCamera(true, true);

  return (
    <>
      <Chat />
    </>
  );
};

export default Map;