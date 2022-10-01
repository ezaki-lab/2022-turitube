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
  const [changeCamera, setChangeCamera] = useState<number>(0);

  useEffect(() => {
    console.log("change camera", changeCamera);
    navigator.mediaDevices.getUserMedia({ ...constraints, audio: true })
      .then((stream) => {
        stream.getAudioTracks().forEach((track) => (track.enabled = constraints.audio));
        localStream.current = stream;
        setReadyCam(true);
        setChangeCamera((rev) => (rev+1))
        if (videoRef.current) {
          videoRef.current!.srcObject = localStream.current;
          videoRef.current.play().catch((e) => console.log(e));
        }
      });

    return (() => {
      if (localStream.current !== null) {
        localStream.current.getVideoTracks().forEach((camera) => { camera.stop(); });
        localStream.current.getAudioTracks().forEach((audio) => { audio.stop(); });
      }
    })
  }, [constraints]);

  return { videoRef, localStream, readyCam, setConstraints, constraints, changeCamera};
}

export default useCamera