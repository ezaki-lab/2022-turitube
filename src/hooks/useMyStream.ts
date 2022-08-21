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
}

// 識別用のルートを取得
const useMyStream = (room_id, socket) => {
  const [myStream, setMyStream] = useState<MyStream>(
    {
    cam: false,
    is_leader: false,
    mic: false,
    pos_x: 0,
    pos_y: 0,
    screen_name: "loading",
    user_name: "loading",
    sid: "loading",
    peer_id: "loading",
    loading: true
  });

  useEffect(() => {
    if (!myStream.loading) {
      console.log(myStream);
      socket.emit("update_user", {
        room_id: room_id,
        user: myStream
      });
    }
  }, [myStream]);

  return { myStream, setMyStream };
};

export default useMyStream;