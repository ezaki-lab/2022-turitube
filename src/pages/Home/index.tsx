import { useRecoilState } from 'recoil';
import React, { useState } from 'react';
import * as atom from '../../common/atom';
import axios from 'axios';
import Url from '../../utils/url';
import useUserData from '../../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { useInterval } from '../../hooks/useInterval';
import Modal from '../../components/Icon/modal';
import Eye from '../../img/icons/eye.png';
import Beacon from '../../img/icons/beacon.png';
import StreamOk from '../../img/icons/stream_ok.png';
import WatchOk from '../../img/icons/watch_ok.png';
import User from '../../components/User';

interface Room {
  host_name: string,
  is_open: number,
  listener: number,
  max_listener: number,
  max_streamer: number,
  room_id: string,
  streamer: number,
  tag: string,
  thumbnail: string,
  title: string
}

// Home - index.tsx
const Home = () => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [selectIndex, setSelectIndex] = useState<number>(null);
  const navigate = useNavigate();

  useInterval(() => {
    axios.get(Url("/room")).then((res) => {
      setRoomList(res.data);
    })
  }, 500)

  return (
    <>
      <Modal />
      <RoomModal roomList={roomList} index={selectIndex} />
      <div className="h-full w-full flex flex-col justify-center items-center pt-14 sm:pb-12">
        <div className="h-full w-full bg-white bg-opacity-50 overflow-y-auto">
          <div className="w-full h-full flex flex-col justify-start items-center px-4 ">
            <div className="w-11/12 sm-max:w-full mx-3 sm-max:pb-56 sm:flex sm:flex-col sm:items-center">
              {roomList.map((v, i) => (
                <label htmlFor="join" onClick={() => setSelectIndex(i)} key={i}>
                  <StreamCard data={v} />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

const RoomModal = ({ roomList, index }) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useRecoilState(atom.user_type);
  if (index == null) {
    return (
      <></>
    )
  }

  const join = (type) => {
    setUserType(type);
    navigate(`/room/${roomList[index].room_id}`)
  }

  return (
    <>
      <input type="checkbox" id="join" className="modal-toggle" />
      <label htmlFor="join" className="modal cursor-pointer">
        <label className="modal-box relative flex flex-col" htmlFor="">
          <div className="flex flex-row items-center justify-evenly h-16">
            <button className="rounded-xl bg-basic p-4 text-white font-bold text-sm active:animate-button-push" onClick={() => join("streamer")}>配信者として参加</button>
            <button className="rounded-xl bg-basic p-4 text-white font-bold text-sm active:animate-button-push" onClick={() => join("listener")}>視聴者として参加</button>
          </div>
        </label>
      </label>
    </>

  )
}

const StreamCard = ({ data }) => {
  const userData = useUserData(data.host_name);

  if (!data) {
    return (
      <></>
    )
  }

  return (
    <>
      <div className="card w-full bg-base-100 rounded-xl shadow-xl my-3 sm:hidden">
        <img src={Url(`/img/thumbnail/${data.thumbnail}`)} className="object-cover h-64 aspect-video rounded-t-xl mt-1.5 mx-1.5" />
        <div className="m-2 mx-3">
          <h2 className="text-tcolor font-bold text-xl">{data.title}</h2>
          <p className="text-basic text-sm">{data.tag}</p>
          <User data={userData} height={10} />
          <div className="flex flex-row items-center h-7 pl-1 my-2">
            <img src={Eye} className="h-3/4" />
            <p className="text-tcolor text-md mx-3">{data.listener}/{data.max_listener}</p>
            <img src={WatchOk} className="h-7 sm:h-8" />
          </div>
          <div className="flex flex-row items-center h-7 pl-1 my-2">
            <img src={Beacon} className="h-3/4" />
            <p className="text-tcolor text-md mx-3">{data.streamer}/{data.max_streamer}</p>
            <img src={StreamOk} className="h-7 sm:h-8" />
          </div>
        </div>
      </div>

      <div className="h-56 w-full max-w-5xl flex flex-row justify-center items-start my-3 mb-6 pr-10 sm-max:hidden">
        <div className="flex flex-col h-full w-1/2">
          <img src={Url(`/img/thumbnail/${data.thumbnail}`)} className="object-cover h-full w-full rounded-xl w-full aspect-video rounded-t-xl" />
        </div>
        <div className="w-1/2 h-full flex flex-col pl-3 py-3">
          <h2 className="text-tcolor text-md font-bold truncate">{data.title}</h2>
          <p className="text-basic text-md">{data.tag}</p>
          <User data={userData} height={10} />
          <div className="flex flex-row items-center h-7 pl-1 my-1 mt-2">
            <img src={Eye} className="h-3/4" />
            <p className="text-tcolor text-md mx-3">{data.listener}/{data.max_listener}</p>
            <img src={WatchOk} className="h-7 sm:h-8" />
          </div>
          <div className="flex flex-row items-center h-7 pl-1 ">
            <img src={Beacon} className="h-3/4" />
            <p className="text-tcolor text-md mx-3">{data.streamer}/{data.max_streamer}</p>
            <img src={StreamOk} className="h-7 sm:h-8" />
          </div>
        </div>
      </div>

    </>
  )

}

export default Home;