import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useCamera from './useCamera';
import * as atom from '../common/atom';
import Peer, { SfuRoom } from "skyway-js";
import Video from '../pages/Room/Video';

type VideoStream = {
  stream: MediaStream;
  peerId: string;
};

const peer = new Peer({ key: process.env.SKYWAY_KEY })

export const useSkyWay = (roomId: string, setMyStream, myStream, localStream, readyCam) => {
  const [remoteVideo, setRemoteVideo] = useState<VideoStream[]>([]);
  const [room, setRoom] = useState<SfuRoom>();

  // カメラの準備ができていれば実行される。
  useEffect(() => {
    if (peer.open && readyCam) {
      setMyStream({...myStream, peer_id: peer.id})

      // SFUルームを利用する。
      const tmpRoom = peer.joinRoom<SfuRoom>(roomId, {
        mode: "sfu",
        stream: localStream.current,
      });

      // 自分が入室したときの処理
      tmpRoom.once("open", () => {
        console.log(`=== You Joined ${peer.id} ===\n`);
      });

      // 誰かが入室したときの処理
      tmpRoom.on("peerJoin", (peerId) => {
        console.log(`=== ${peerId} joined ===\n`);
      });

      // 誰かがストリーム開始したとき
      // remoteVideoに画面配信情報を書き込み
      tmpRoom.on("stream", async (stream) => {
        console.log(`${stream.peerId} start stream`)
        setRemoteVideo((prev) => [
          ...prev,
          { stream: stream, peerId: stream.peerId },
        ])
      })

      // 誰かが退室したとき
      // remoteVideoから適したビデオ情報を削除する
      tmpRoom.on("peerLeave", (peerId) => {
        setRemoteVideo((prev) => {
          return prev.filter((video) => {
            if (video.peerId === peerId) {
              video.stream.getTracks().forEach((track) => track.stop());
            }
            return video.peerId !== peerId;
          });
        });
        console.log(`=== ${peerId} left ===\n`);
      });
      setRoom(tmpRoom);

      return (() => {
        console.log("teisi")
        tmpRoom.close();
      })
    }
  }, [readyCam]);

  return { remoteVideo, room };
};
