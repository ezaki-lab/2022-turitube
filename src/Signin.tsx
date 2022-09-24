import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import * as atom from './common/atom';
import { Link } from 'react-router-dom';

// サインインページ
const Signin = () => {
  const [user, setUser] = useRecoilState(atom.user_info);

  useEffect(() => {
    ;
  }, []);


  // 将来的にはスライドショー流します
  return (
    <>
      <div className="pt-28 pb-28 h-full overflow-y-auto">
        signin page
      </div>
    </>
  );
};

export default Signin;