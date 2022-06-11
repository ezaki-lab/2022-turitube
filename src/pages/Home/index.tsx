import { useRecoilState } from 'recoil';
import React from 'react';
import { Link } from "react-router-dom";
import * as atom from '../../common/atom';
import Social from './social';
import useHeadRoute from '../../hooks/useHeadRoute';

const Home = () => {
  const [user, setUser] = useRecoilState(atom.user);

  return (
    <>
      <div className="bg-red-600">
      <button className="btn bg-basic">Hello daisyUI</button>
      <button>test</button>
        user <Link to={`/user/kosakae256`}>こちら</Link>
        <Social />
      </div>
      <p>
      a<br />
      a<br />
      </p>
    </>
  );
};

export default Home;