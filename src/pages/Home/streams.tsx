import { useRecoilState } from 'recoil';
import React from 'react';
import { Link } from "react-router-dom";
import * as atom from '../../common/atom';


// Home - streams.tsx
// 配信状況の取得と表示命令
const Streams = () => {
  const [user, setUser] = useRecoilState(atom.user);

  return (
    <>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </>
  );
};

const Card = () => {
  // 配信状況を引数で受け取ってそれを表示
  return (
    <div className="w-full md:w-64 md:mx-4 bg-white-100 my-4 flex flex-col">
      <img src="https://tsurinews.jp/data/wp-content/uploads/2020/09/wpecDSC_3262-690x427.jpg" className="w-full object-fill" />
      <div className="flex-grow flex flex-row m-1">
        <div className="aspect-square h-8 flex items-center justify-center">
          <img src="https://tsurinews.jp/data/wp-content/uploads/2020/09/wpecDSC_3262-690x427.jpg" className="h-5/6 w-5/6 object-cover rounded-full" />
        </div>
        <div className="mx-1 flex-auto leading-5 flex flex-col">
          <h2 className="font-semibold text-xs">ここにタイトルが入ります</h2>
          <p className="text-basic text-xs">#ハッシュタグ #アジ</p>
          <p className="text-xs">たからーん帝国 20分前 閲覧7人</p>
        </div>
      </div>
    </div>
  )
}

export default Streams;