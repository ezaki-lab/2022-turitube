import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import UndeFined from "../../../img/icons/picture_book_undefined.png";
import { Link } from 'react-router-dom';
import TitleHeader from '../../../components/TitleHeader';

// 図鑑 - index
const PictureBook = () => {

  const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <TitleHeader title="図鑑" />
      <div className="w-full h-full flex flex-col items-center justify-center pt-14 sm:pb-12">
        <div className="h-full w-full px-4 max-w-7xl flex flex-wrap items-center overflow-y-auto sm-max:pb-56">
          {t.map((v, i) => {
            return (
              <Link to={`/picture_book/${v}`} className="w-1/3 sm:w-1/4 lg:w-1/5 xl:w-1/6 p-2 sm:p-4 flex flex-col justify-center items-center" key={v}>
                <div className="w-full aspect-square flex flex-col items-center">
                  <div className="rounded-2xl border-4 lg:border-8 border-gray h-full w-full">
                    <div className="rounded-xl border-4 lg:border-8 border-white h-full w-full">
                      <img src={UndeFined} className="object-cover w-full h-full roundex-xl" />
                    </div>
                  </div>
                </div>
                <p className="text-tcolor font-bold text-sm lg:text-base">{('000' + v).slice(-3)} アジ</p>
              </Link>
            )
          })}
        </div>
      </div>

    </>
  );
};

export default PictureBook;