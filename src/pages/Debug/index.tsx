import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import * as atom from '../../common/atom';
import { Link } from 'react-router-dom';
import useCamera from '../../hooks/useCamera';

// Home - index.tsx
const Debug = () => {
  const [user, setUser] = useRecoilState(atom.user_info);

  useEffect(() => {
    ;
  }, []);


  // 将来的にはスライドショー流します
  return (
    <>
      <div className="pt-28 pb-28 h-full overflow-y-auto">
        <Video mode={{exact: "environment"}} />
        <Video mode={{exact: "environment"}} />
        <Video mode={{exact: "environment"}} />
        <Video mode={{exact: "environment"}} />
        <Video mode={{exact: "user"}} />
      </div>
    </>
  );
};

const Video = ({ mode }) => {
  const { videoRef, localStream, readyCam, setConstraints } = useCamera({ audio: false, video: true }, mode);
  return (<video ref={videoRef} playsInline muted />)
}

export default Debug;