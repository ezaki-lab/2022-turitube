import { useEffect, useState } from 'react';
import useHeadRoute from "./useHeadRoute"
import { useRecoilState } from 'recoil';
import * as atom from '../common/atom';

// 他のユーザーの配信情報を取得する
// 他のユーザーに動きがあった際、websocketを通じて自動的に更新する。
const useRemoteStream = (socket) => {
  const [remoteStream, setRemoteStream] = useState<{}>({});
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

  useEffect(() => {
    if (socket && userInfo.user_name) {
      // roomの環境が変化したときに実行(streamは自分以外を保存する)
      socket.on("update_room", (data) => {
        let tmpUserData = [];
        data.users.forEach((elem, index) => {
          if (elem.user_name !== userInfo.user_name) {
            tmpUserData.push(elem);
          }
        })
        setRemoteStream({ ...data, users: tmpUserData });
      });
    }
  }, [socket, userInfo])

  useEffect(() => {
    // console.log(remoteStream);
  }, [remoteStream])

  return { remoteStream };
};

export default useRemoteStream;