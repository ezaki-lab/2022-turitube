import { useRecoilState } from 'recoil';
import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import * as atom from '../../common/atom';
import useHeadRoute from '../../hooks/useHeadRoute';
import Streams from './streams';

// Home - index.tsx
const Home = () => {
  const [user, setUser] = useRecoilState(atom.user_info);

  useEffect(() => {
    ;
  }, [])
  
  return (
    <>
      <div className="flex flex-col md:flex-wrap md:flex-row md:pt-12 justify-start h-full">
        <Streams />
      </div>

    </>
  );
};

export default Home;