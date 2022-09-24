import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';
import Streamer from './streamer';
import Listener from './listener';
import { useNavigate } from 'react-router-dom';

// Room 配信部屋
const Room = () => {
  const [user, setUser] = useRecoilState(atom.user_info);
  const [width, height] = useWindowSize();
  const [isStreamer, setIsStreamer] = useState<boolean>(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <input type="checkbox" id="exit-modal" className="modal-toggle"/>
      <label htmlFor="exit-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-2xl text-tcolor font-bold">配信から退出する</h3>
          <p className="pt-4 tcolor font-bold">配信から退出しますか？</p>
          {isHost ? <p className="py-2 text-red-500 font-bold">あなたは配信のホストです！退出すると全員終了します！</p> : <></>}
          
          <div className="flex justify-end mt-4">
            <button className="btn btn-active border-basic text-white bg-basic tracking-wide" onClick={() => navigate("/")}>配信から退出</button>
          </div>
        </label>
      </label>
      {isStreamer ? <Streamer /> : <></>}
      {!isStreamer ? <Listener /> : <></>}
    </>

  )


}

export default Room;