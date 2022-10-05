import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import * as atom from '../../common/atom';
import SaveDiary from "./savediary";
import SavePictureBook from "./savePictureBook";
import First from './first';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Url from '../../utils/url';

interface ImgData {
  img_name: string,
  place_name: string
}

interface Stream {
  thumbnail: string,
  title: string,
  tag: string,
  time: string,
  start_datetime: string,
  count: number,
  host_name: string
}

// 配信終了時に遷移する画面
const EndStream = () => {
  const [userId] = useRecoilState(atom.user_id);
  const [next, setNext] = useState<number>(0);
  const { room_id } = useParams();
  const [stream, setStream] = useState<Stream>();
  const [ready, setReady] = useState<boolean>(false);

  const [imgDataList, setImgDataList] = useState<ImgData[]>([]);

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

  useEffect(() => {
    axios.get(Url("/stream_photo"), {
      params:{
        user_id: userId,
        room_id: room_id
      }
    }).then((res) => {
      setImgDataList(res.data.img_data);
    })
  }, []);

  if (!ready) return (<></>)
  return (
    <>
      {next == 0 ? <First setNext={setNext} stream={stream} /> : <></>}
      {next == 1 ? <SaveDiary setNext={setNext} stream={stream} imgDataList={imgDataList} /> : <></>}
      {next == 2 ? <SavePictureBook /> : <></>}
    </>
  );
}

export default EndStream;