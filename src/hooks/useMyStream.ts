import { useEffect, useState } from 'react';
import useHeadRoute from "./useHeadRoute"
import { useRecoilState } from 'recoil';
import * as atom from '../common/atom';

interface MyStream {
  cam: boolean,
  is_leader: boolean,
  mic: boolean,
  pos_x: number,
  pos_y: number,
  screen_name: string,
  user_name: string,
  sid: string,
  peer_id: string,
  loading: boolean
  avatar: {
    hat: number,
    hair: number,
    face: number,
    body: number,
    pants: number,
    foot: number
  }
}

// 自分の配信情報を管理する
// + 自分の配信情報が更新(setMyStream)されたら自動的に他のユーザーにじぶんの情報を送信する
const useMyStream = (room_id, socket) => {
  const [myStream, setMyStream] = useState<MyStream>(
    {
      cam: false,
      is_leader: false,
      mic: false,
      pos_x: 0.5,
      pos_y: 0.5,
      screen_name: "loading",
      user_name: "loading",
      sid: "loading",
      peer_id: "loading",
      loading: true,
      avatar: {
        hat: 0,
        hair: 0,
        face: 0,
        body: 0,
        pants: 0,
        foot: 0
      }
    });

  useEffect(() => {
    if (!myStream.loading) {
      socket.emit("update_user", {
        room_id: room_id,
        user: myStream
      });
    }
  }, [myStream]);

  return { myStream, setMyStream };
};

export default useMyStream;