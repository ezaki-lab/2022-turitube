import { useState, useEffect } from "react";

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