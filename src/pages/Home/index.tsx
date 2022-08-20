import { useRecoilState } from 'recoil';
import React, {useEffect} from 'react';
import * as atom from '../../common/atom';
import Streams from './streams';

// Home - index.tsx
const Home = () => {
  const [user, setUser] = useRecoilState(atom.user_info);

  useEffect(() => {
    ;
  }, [])
  
  return (
    <>
      <div className="flex flex-col md:flex-wrap md:flex-row md:pt-12 justify-start md:justify-center  h-full">
        <Streams />
      </div>

    </>
  );
};

export default Home;