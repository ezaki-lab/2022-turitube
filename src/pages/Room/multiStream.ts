import React, { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

interface MultiStream {
  streamer: [],
  listener: [],
  displayPeer: string
}

const multiStreamManager = (socket) => {
  const [multiStream, setMultiStream] = useState<MultiStream>({
    streamer:[],
    listener:[],
    displayPeer:""
  });

  useEffect(() => {
    if (socket) {
      socket.on("update_stream", (data) => {
        setMultiStream(data);
      })
    }
  }, [socket]);

  return multiStream
};

export default multiStreamManager