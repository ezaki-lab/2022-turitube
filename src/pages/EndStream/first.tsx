import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import * as atom from '../../common/atom';
import { useNavigate } from 'react-router-dom';
import Url from '../../utils/url';
import axios from 'axios';
import Time from "../../img/icons/time.png";
import Group from "../../img/icons/group.png";
import EnteredSum from "../../img/icons/entered_sum.png";
import useUserData from '../../hooks/useUserData';
import Icon from '../../components/Icon';
import Modal from '../../components/Icon/modal';
import TitleHeader from '../../components/TitleHeader';

interface Stream {
  thumbnail: string,
  title: string,
  tag: string,
  time: string,
  start_datetime: string,
  count: number,
  host_name: string
}

const First = ({ setNext, room_id }) => {
  const [userType, setUserType] = useRecoilState(atom.user_type);
  const navigate = useNavigate();
  const [stream, setStream] = useState<Stream>();
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    axios.get(Url("/room"), {
      params: {
        room_id: room_id,
      }
    }).then((res) => {
      console.log(res.data)
      setStream(res.data);
      setReady(true);
    });
  }, []);

  const clickEvent = () => {
    if (userType == "listener") navigate("/");
    else if (userType == "streamer") setNext(1);
    else {/*navigate("/");*/ setNext(1); }
    setUserType(null);
  }

  if (!ready) return (<></>);
  return (
    <>
      <TitleHeader title="配信終了" />
      <Modal />
      <div className="w-full h-full flex flex-col">
        <div className="w-full max-w-4xl flex-auto mx-auto flex flex-col overflow-y-auto px-8 mt-16">
          <h2 className="text-basic text-2xl font-bold mx-auto mb-4">配信が終了しました</h2>
          <img src={Url(`/img/thumbnail/${stream.thumbnail}`)} className="object-cover w-full border-2 border-basic rounded-xl aspect-video mb-1 mx-auto" />
          <User user_name={stream.host_name} />
          <Detail Image={Group} data={stream.title} />
          <Detail Image={Time} data={stream.time} />
          <Detail Image={EnteredSum} data={`${stream.count}人`} />
        </div>
        <div className="h-12 w-full flex justify-center space-x-4 items-center px-8 border-t border-gray sticky bottom-0" >
          <button className="bg-basic text-white font-bold p-3 m-1 px-4 text-sm rounded-xl w-32 active:animate-button-push" onClick={() => { clickEvent(); }}>次へ</button>
        </div>

      </div>
    </>
  )
}

const Detail = ({ Image, data }) => {
  return (
    <div className="flex flex-row items-center pb-2 sm:pb-3 space-x-3 h-10">
      <img src={Image} className="h-6 sm:h-8" />
      <p className="text-tcolor text-lg sm:text-xl">{data}</p>
    </div>
  )
}

const User = ({ user_name }) => {
  const userData = useUserData(user_name);
  if (!userData) return (<></>)
  return (
    <>
      <div className="h-10 w-full flex items-center mb-8">
        <Icon data={userData} />
        <div className="flex flex-col justify-center px-2">
          <p className="text-tcolor text-lg line-clamp-2">{userData.screen_name}</p>
        </div>
      </div>
    </>

  )
}

export default First;