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

export const useSkyWay = (roomId: string) => {
    const [localStream, setLocalStream] = useState<MediaStream>();
    const [remoteVideo, setRemoteVideo] = useState<VideoStream[]>([]);
    const [room, setRoom] = useState<SfuRoom>();

    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
          setReady(true);
        }, 2000);
      }, []);

    useEffect(() => {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            setLocalStream(stream);
            /*
            if (localVideoRef.current) {
              localVideoRef.current.srcObject = stream;
              localVideoRef.current.play().catch((e) => console.log(e));
            }
            */
          })
          .catch((e) => {
            console.log(e);
          });
      }, []);

    useEffect(() => {
        if (peer.open && ready) {
            console.log("a")

            const tmpRoom = peer.joinRoom<SfuRoom>(roomId, {
                mode: "sfu",
                stream: localStream,
            });

            // 自分が入室したときの処理
            tmpRoom.once("open", () => {
                console.log("=== You Joined ===\n");
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
    }, [ready]);



    useEffect(() => {
        console.log(remoteVideo);
    }, [remoteVideo])

    return [remoteVideo, setLocalStream];
};
