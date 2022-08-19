/*  User */
import { useRecoilState } from 'recoil';
import React, { useState, useEffect, useContext } from 'react';
import Chat from './chat';
import * as atom from '../../common/atom';

// ユーザーページ
const Map = () => {
  return (
    <>
      <Chat />
    </>
  );
};

export default Map;