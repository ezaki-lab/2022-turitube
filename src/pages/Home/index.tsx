import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../common/atom';
import axios from 'axios';
import Url from '../../utils/url';
import { Link } from 'react-router-dom';
import Person from '../../img/icons/person.png';
import Eye from '../../img/icons/eye.png';
import Beacon from '../../img/icons/beacon.png';
import StreamOk from '../../img/icons/stream_ok.png';
import StreamNg from '../../img/icons/stream_ng.png';
import WatchOk from '../../img/icons/watch_ok.png';
import WatchNg from '../../img/icons/watch_ng.png';
import Kari from "../../img/kari4.png";

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
  title:string
}

// Home - index.tsx
const Home = () => {
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [roomList, setRoomList] = useState<Room[]>([]);

  useEffect(() => {
    axios.get(Url("/room")).then((res) => {
      setRoomList(res.data);
    })
  }, []);


  // 将来的にはスライドショー流します
  return (
    <>


      <div className="h-full w-full flex flex-col justify-center items-center pt-14 sm:pb-12">
        <div className="h-full w-full bg-white bg-opacity-50 overflow-y-auto">
          <div className="w-full h-full flex flex-col justify-start items-center px-4 ">
            <div className="w-11/12 sm-max:w-full mx-3 sm-max:pb-56 sm:flex sm:flex-col sm:items-center">
              {roomList.map((v, i) => (
                <StreamCard data={v} />
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

const StreamCard = ({data}) => {
  return (
    <>
      <Link to={`/room/${data.room_id}`} className="card w-full bg-base-100 rounded-xl shadow-xl my-3 sm:hidden">
        <img src={Kari} className="object-cover h-64 aspect-video rounded-t-xl mt-1.5 mx-1.5" />
        <div className="m-2 mx-3">
          <h2 className="text-tcolor font-bold text-xl">初心者歓迎！釣り配信！</h2>
          <p className="text-basic text-sm">#アジ #初心者</p>
          <div className="my-4 flex flex-row h-8 items-center">
            <img src={Kari} className="rounded-full aspect-square mr-2 h-8" />
            <p className="text-tcolor text-sm">こさか</p>
          </div>

        </div>
      </Link>
      <Link to={`/room/${data.room_id}`} className="h-56 w-full max-w-5xl flex flex-row justify-center items-start my-3 mb-6 pr-10 sm-max:hidden">
        <div className="flex flex-col h-full w-1/2">
          <img src={Kari} className="object-cover h-full w-full rounded-xl w-full aspect-video rounded-t-xl" />
        </div>
        <div className="w-1/2 h-full flex flex-col pl-3 py-3">
          <h2 className="text-tcolor text-md font-bold truncate">{data.title}</h2>
          <p className="text-basic text-md">{data.tag}</p>
          <div className="my-1 flex flex-row h-8 items-center">
            <img src={Kari} className="rounded-full aspect-square mr-2 h-8 w-8" />
            <p className="text-tcolor text-md">{data.host_name}</p>
          </div>
          <div className="flex flex-row items-center h-7 pl-1">
            <img src={Eye} className="h-3/4" />
            <p className="text-tcolor text-md ml-3">{data.listener}/{data.max_listener}</p>
          </div>
          <div className="flex flex-row items-center h-7 pl-1">
            <img src={Beacon} className="h-3/4" />
            <p className="text-tcolor text-md ml-3">{data.streamer}/{data.max_streamer}</p>
          </div>

          <div className="w-full flex flex-row justify-start items-center h-16 w-2/3">
            <img src={WatchOk} className="h-7 sm:h-8" />
            <img src={StreamNg} className="h-7 sm:h-8" />
          </div>
        </div>
      </Link>


    </>
  )

}

export default Home;