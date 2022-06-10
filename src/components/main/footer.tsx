import { useRecoilState } from 'recoil';
import React from 'react';
import { Link } from "react-router-dom";
import * as atom from '../../common/atom';

const Home = () => {
  const [user, setUser] = useRecoilState(atom.user);
  return (
    <>
      
    </>
  );
};

export default Home;