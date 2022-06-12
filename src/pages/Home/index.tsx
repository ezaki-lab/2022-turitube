import { useRecoilState } from 'recoil';
import React from 'react';
import { Link } from "react-router-dom";
import * as atom from '../../common/atom';
import useHeadRoute from '../../hooks/useHeadRoute';
import Streams from './streams';

// Home - index.tsx
const Home = () => {
  const [user, setUser] = useRecoilState(atom.user);
  
  return (
    <>
      <div className="flex flex-wrap justify-center">
        <Streams />
      </div>

    </>
  );
};

export default Home;