import React, { useState, useEffect } from "react";
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

const multiStreamManager = (socket) => {
  const [multiStream, setMultiStream] = useState({});

  useEffect(() => {
    if(socket) {
      if(socket) {
        socket.on("update_stream", (data) => {
          setMultiStream(data);
        })
      }
    }
  }, [socket]);

  useEffect(() => {
    //console.log(multiStream)
  }, [multiStream]);
  return multiStream
};

export default multiStreamManager