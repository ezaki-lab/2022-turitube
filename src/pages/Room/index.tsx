import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import ScrollToBottom from 'react-scroll-to-bottom';
import Streamer from './streamer';
import Listener from './listener';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Icon/modal';
import { useParams } from 'react-router-dom';
import useSocketIo from '../../hooks/useSocketIo';
import multiStreamManager from './multiStream';

// Room 配信部屋
const Room = () => {
  const [userType, setUserType] = useRecoilState(atom.user_type);
  const [me, setMe] = useRecoilState(atom.me);
  const [ready, setReady] = useState(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const { room_id } = useParams();
  const socket = useSocketIo("stream");
  const multiStream = multiStreamManager(socket);
  const navigate = useNavigate();

  const navigateEndStream = () => {
    navigate(`/end_stream/${room_id}`);
  };

  useEffect(() => {
    ;
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        socket.emit("join", {
          room_id: room_id,
          user_name: me.user_name,
          user_type: userType
        })
        socket.on('host', () => {
          setIsHost(true);
        });
        socket.on('delete_room', () => {
          navigateEndStream()
        })
      });
      setReady(true);
    }
  }, [socket]);

  if (!userType) {
    navigate("/");
    return (<></>)
  }

  if (!Object.keys(me).length) {
    return (<></>)
  }

  if (!ready && !multiStream) return (<></>);
  return (
    <>
      <Modal />
      <input type="checkbox" id="exit-modal" className="modal-toggle" />
      <label htmlFor="exit-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-2xl text-tcolor font-bold">配信から退出する</h3>
          <p className="pt-4 tcolor font-bold">配信から退出しますか？</p>
          {isHost ? <p className="py-2 text-red-500 font-bold">あなたは配信のホストです！退出すると全員終了します！</p> : <></>}

          <div className="flex justify-end mt-4">
            <button className="btn btn-active border-basic text-white bg-basic tracking-wide" onClick={() => { navigateEndStream() }}>配信から退出</button>
          </div>
        </label>
      </label>
      {userType == "streamer" ? <Streamer socket={socket} multiStream={multiStream} /> : <></>}
      {userType == "listener" ? <Listener socket={socket} multiStream={multiStream} /> : <></>}
    </>

  )


}

export default Room;