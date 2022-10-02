import React, { useState, useEffect, useRef } from 'react';

interface Constraints {
  video: {
    facingMode: string | { exact: string }
  } | false,
  audio: boolean
}

const useCamera = (initialConstraints) => {
  const videoRef = useRef<HTMLVideoElement>();
  const localStream = useRef<MediaStream>(null);
  const [readyCam, setReadyCam] = useState<boolean>(false);
  const [constraints, setConstraints] = useState<Constraints>(initialConstraints);
  const [change, setChange] = useState<number>(1);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ ...constraints, audio: true })
      .then((stream) => {
        stream.getAudioTracks().forEach((track) => (track.enabled = constraints.audio));
        localStream.current = stream;
        setReadyCam(true);
        setChange((rev) => (rev + 1))
        if (videoRef.current) {
          videoRef.current!.srcObject = localStream.current;
          videoRef.current.play().catch((e) => console.log(e));
        }
      });

    return (() => {
      if (localStream.current !== null) {
        localStream.current.getTracks().forEach((track) => { track.stop(); });
      }
    })
  }, [constraints]);

  return { videoRef, localStream, readyCam, setConstraints, constraints, change };
}

export default useCamera