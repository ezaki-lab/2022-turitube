import React, { useState, useEffect, useRef } from 'react';

const useCamera = (initialConstraints) => {
  const videoRef = useRef<HTMLVideoElement>();
  const localStream = useRef<MediaStream>();
  const [readyCam, setReadyCam] = useState<boolean>(false);
  const [constraints, setConstraints] = useState(initialConstraints);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: {facingMode: "environment"}, audio: true })
      .then((stream) => {
        stream.getAudioTracks().forEach((track) => (track.enabled = initialConstraints.audio));
        stream.getVideoTracks().forEach((track) => (track.enabled = initialConstraints.video));
        localStream.current = stream;
        setReadyCam(true);

        if (videoRef.current) {
          videoRef.current!.srcObject = localStream.current;
          videoRef.current.play().catch((e) => console.log(e));
        }
      })
    return (() => {
      if (localStream.current) localStream.current.getTracks().forEach((track) => (track.stop()));
    })
  }, []);

  useEffect(() => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => (track.enabled = constraints.audio));
      localStream.current.getVideoTracks().forEach((track) => (track.enabled = constraints.video));
    }
  }, [constraints]);

  return { videoRef, localStream, readyCam, setConstraints };
}

export default useCamera