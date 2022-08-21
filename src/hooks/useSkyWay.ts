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
  // const [localStream, setLocalStream] = useRef<MediaStream>();
  const localStream = useRef<MediaStream>();
  const [remoteVideo, setRemoteVideo] = useState<VideoStream[]>([]);
  const [room, setRoom] = useState<SfuRoom>();

  const [readyCam, setReadyCam] = useState<boolean>(false);

  // 外カメにしたいけどよくわからなくなってるので今は無視
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true/*{facingMode: "environment"}*/, audio: true })
      .then((stream) => {
        localStream.current = stream;
        setReadyCam(true);
      })
  }, []);

  useEffect(() => {
    if (peer.open && readyCam) {
      localStream.current.getAudioTracks().forEach((track) => (track.enabled=false))
      localStream.current.getVideoTracks().forEach((track) => (track.enabled=false))

      setMyStream({...myStream, peer_id: peer.id})

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
      tmpRoom.on("stream", async (stream) => {
        console.log(`${stream.peerId} start stream`)
        setRemoteVideo((prev) => [
          ...prev,
          { stream: stream, peerId: stream.peerId },
        ])
      })

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

    return () => {
      if (room) room.close();
    }
  }, [readyCam]);


  useEffect(() => {
    console.log(remoteVideo);
  }, [remoteVideo])

  return { remoteVideo, localStream };
};
