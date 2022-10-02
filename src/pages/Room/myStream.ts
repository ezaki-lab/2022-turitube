import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

interface MyStream {
  audio: boolean,
  camera: boolean,
  face: number,
  is_host: boolean
}

const myStreamManager = (socket) => {
  const [ready, setReady] = useState(false);
  const { room_id } = useParams();
  const [me, setMe] = useRecoilState(atom.me);
  const [userType, setUserType] = useRecoilState(atom.user_type);
  const [audio, setAudio] = useState<boolean>(false);
  const [camera, setCamera] = useState<boolean>(false);
  const [face, setFace] = useState<number>(0);
  const [myStream, setMyStream] = useState<MyStream | null>(
    {
      audio: false,
      camera: false,
      face: 0,
      is_host: false,
    }
  );

  useEffect(() => {
    if (socket && ready) {
      socket.emit("update_user", {
        room_id: room_id,
        user_name: me.user_name,
        user_type: userType,
        user: myStream
      })
    }
  }, [myStream]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setReady(true);
      })
      socket.on("camera", (data) => {
        if (me.user_name !== data.user_name) setCamera(false);
        else setCamera(true);
      })
    }
  }, [socket]);

  useEffect(() => {
    setMyStream((rev) => ({ ...rev, audio: audio }));
  }, [audio]);

  useEffect(() => {
    setMyStream((rev) => ({ ...rev, camera: camera }));
  }, [camera]);

  useEffect(() => {
    setMyStream((rev) => ({ ...rev, face: face }));
  }, [face]);

  return { myStream, setAudio, setCamera, setFace }
};

export default myStreamManager