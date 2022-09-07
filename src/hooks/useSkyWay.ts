import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as atom from '../common/atom';
import Peer, { SfuRoom } from "skyway-js";
import Video from '../pages/Room/Video';

type VideoStream = {
  stream: MediaStream;
  peerId: string;
};

const peer = new Peer({ key: process.env.SKYWAY_KEY })

export const useSkyWay = (roomId: string, setMyStream, myStream) => {
  const localStream = useRef<MediaStream>();
  const [remoteVideo, setRemoteVideo] = useState<VideoStream[]>([]);
  const [room, setRoom] = useState<SfuRoom>();

  const [readyCam, setReadyCam] = useState<boolean>(false);

  // 外カメにしたいけどよくわからなくなってるので今は無視
  // カメラとマイクのデフォルトはオフだが、設定上trueにする必要がある
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true/*{facingMode: "environment"}*/, audio: true })
      .then((stream) => {
        localStream.current = stream;
        setReadyCam(true);
      })
    return (() => {
      localStream.current.getTracks().forEach(track => track.stop());
    })
  }, []);

  // カメラの準備ができていれば実行される。
  useEffect(() => {
    if (peer.open && readyCam) {
      // カメラとマイクはデフォルトではオフにする
      localStream.current.getAudioTracks().forEach((track) => (track.enabled=false))
      localStream.current.getVideoTracks().forEach((track) => (track.enabled=false))

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
    }
  }, [readyCam]);


  useEffect(() => {
    console.log(remoteVideo);
  }, [remoteVideo])

  return { remoteVideo, localStream, room };
};
