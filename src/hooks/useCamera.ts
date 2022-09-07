import React, { useState, useEffect, useRef } from 'react';

const useCamera = (video: boolean, audio: boolean) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: video, audio: audio })
            .then((stream) => {
                videoRef.current!.srcObject = stream;
                videoRef.current.play().catch((e) => console.log(e));
            })
    }, []);

    return videoRef;
}

export default useCamera