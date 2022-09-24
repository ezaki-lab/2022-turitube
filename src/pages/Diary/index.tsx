import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import TitleHeader from '../../components/TitleHeader';
import { Link } from 'react-router-dom';

// 日誌 - index
const Diary = () => {

  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <TitleHeader title="日誌" />
      <div className="h-full w-full flex flex-col items-center pt-16 sm:pb-16 sm-max:pb-60 overflow-y-auto">
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
        <Content />
      </div>
    </>
  );
};

const Content = () => {
  return (
    <Link to="/diary/1234567890" className="w-full flex flex-row h-24 md:h-28 lg:h-36 xl:h-48 border-b border-gray p-2 max-w-5xl">
      <img src="https://www.bepal.net/wp-content/uploads/2021/07/Amane_turigirl02.jpg" className="h-full aspect-video object-cover" />
      <div className="h-full w-12 flex-auto flex flex-col justify-start px-2 pt-2">
        <h3 className="text-lg sm:text-xl lg:text-2xl text-tcolor truncate">日誌のタイトルああああああ</h3>
        <h3 className="text-md sm:text-xl lg:text-2xl text-tcolor">2022/02/08</h3>
      </div>
    </Link>
  )
};

export default Diary;