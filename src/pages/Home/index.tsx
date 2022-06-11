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
      <div className="flex flex-wrap justify-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

    </>
  );
};

const Card = () => {
  return (
    <>
      <div className="w-full md:w-80 h-auto md:h-auto bg-white-200 md:m-4 mb-4">
        <img src="https://tsurinews.jp/data/wp-content/uploads/2020/09/wpecDSC_3262-690x427.jpg" className="w-full max-h-96 object-cover" />
        <div className="flex flex-row m-3">
          <div className="h-12 w-12 flex items-center justify-center">
            <img src="https://tsurinews.jp/data/wp-content/uploads/2020/09/wpecDSC_3262-690x427.jpg" className="h-5/6 w-5/6 object-cover rounded-full" />
          </div>
          <div className="mx-1 flex flex-col">
            <h2 className="text-xl font-semibold">ここにタイトルが入ります</h2>
            <p className="leading-3 text-basic">#ハッシュタグ #アジ</p>
            <p className="leading-7">たからーん帝国 20分前 閲覧7人</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;