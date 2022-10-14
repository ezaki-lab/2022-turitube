import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../common/atom';
import Streamer from './streamer';
import Listener from './listener';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Icon/modal';
import { useParams } from 'react-router-dom';
import useSocketIo from '../../hooks/useSocketIo';
import multiStreamManager from './multiStream';
import time from '../../utils/time';

// Room 配信部屋
const Room = () => {
  const [userType, setUserType] = useRecoilState(atom.user_type);
  const [me, setMe] = useRecoilState(atom.me);
  const [locus, setLocus] = useRecoilState(atom.locus);
  const [ready, setReady] = useState(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const { room_id } = useParams();
  const socket = useSocketIo("stream");
  const multiStream = multiStreamManager(socket);
  const [remotePeer, setRemotePeer] = useState<string>("");
  const [myPeer, setMyPeer] = useState<string>("");
  const [isMetaverse, setIsMetaverse] = useState<boolean>(true);
  const navigate = useNavigate();

  const navigateEndStream = () => {
    socket.emit("leave", {
      user_name: me.user_name,
      room_id: room_id,
      user_type: userType,
      myPeer: myPeer,
      remotePeer: remotePeer
    });
    navigate(`/end_stream/${room_id}`);
  };

  useEffect(() => {
    setLocus((rev) => [
      {
        content: "▶",
        time: time(),
        text: `配信を開始した！`
      }
    ])
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.emit("reconnect", {
          room_id: room_id
        })
      })
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
      });

      socket.on("camera_on", (data) => {
        setRemotePeer(data.peer_id);
        setIsMetaverse(false);
        
      });
      socket.on("camera_off", (data) => {
        setRemotePeer("");
        setIsMetaverse(true);
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
      {userType == "streamer" ? <Streamer socket={socket} multiStream={multiStream} remotePeer={remotePeer} isMetaverse={isMetaverse} setMyPeer={setMyPeer} myPeer={myPeer} /> : <></>}
      {userType == "listener" ? <Listener socket={socket} multiStream={multiStream} remotePeer={remotePeer} isMetaverse={isMetaverse} /> : <></>}
    </>

  )


}

export default Room;