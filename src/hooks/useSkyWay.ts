import React, { useEffect, useState, useRef, Ref } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import useCamera from './useCamera';
import * as atom from '../common/atom';
import Peer, { SfuRoom } from "skyway-js";

type VideoStream = {
  peerId: string,
  stream: MediaStream,
};

const peer = new Peer({ key: process.env.SKYWAY_KEY })

export const useSkyWay = (roomId: string, localStream, readyCam) => {
  const [remoteVideo, setRemoteVideo] = useState<VideoStream[]>([]);
  const [room, setRoom] = useState<SfuRoom>();
  const [myPeer, setMyPeer] = useState<string>();
  const [readySkyWay, setReadySkyWay] = useState<boolean>(false);

  // カメラの準備ができていれば実行される。
  useEffect(() => {
    if (readyCam) {
      // SFUルームを利用する。
      const tmpRoom = peer.joinRoom<SfuRoom>(roomId, {
        mode: "sfu",
        stream: localStream.current,
      });

      // 自分が入室したときの処理
      tmpRoom.once("open", () => {
        console.log(`=== You Joined ${peer.id} ===\n`);
        setMyPeer(peer.id);
        setReadySkyWay(true);
      });

      // 誰かが入室したときの処理
      tmpRoom.on("peerJoin", (peerId) => {
        console.log(`=== ${peerId} joined ===\n`);
      });

      // 誰かがストリーム開始したとき
      // remoteVideoに画面配信情報を書き込み
      tmpRoom.on("stream", async (stream) => {
        console.log(`${stream.peerId} start stream`)
        setRemoteVideo((rev) => [...rev, {peerId: stream.peerId, stream: stream} ]);
      });
      

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
        tmpRoom.close();
      })
    }
  }, [readyCam]);

  return { remoteVideo, myPeer, room, readySkyWay };
};