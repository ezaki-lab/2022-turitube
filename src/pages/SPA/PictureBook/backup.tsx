import { useRecoilState } from 'recoil';
import React, { useEffect } from 'react';
import * as atom from '../../../common/atom';
import BackHeader from '../../../components/BackHeader';
import { Link } from 'react-router-dom';

// 図鑑 - index
const PictureBook = () => {

  const t = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <div className="h-full w-full flex flex-col pt-20 sm-max:space-y-4 sm:flex-row-reverse sm:justify-center">
        <div className="h-full flex flex-auto sm-max:max-w-2xl sm:justify-center sm:items-center sm:w-96">
          <div className="carousel carousel-center h-64 px-4 sm-max:h-full sm-max:w-full w-full sm-max:space-x-4 sm:pl-4 sm:carousel-vertical sm:h-full sm:space-y-4 sm:max-w-md lg:max-w-xl xl:max-w-3xl">
            {t.map((value, index) => (
              <div id={`item${index}`} className="carousel-item w-5/6 h-full sm:w-full sm:h-5/6">
                <div className="rounded-box w-full border-2 bg-white flex flex-col">
                  <img src="https://placeimg.com/250/180/arch" className="h-32 flex-auto w-full object-contain bg-black rounded-t-xl" />
                  <div className="flex h-32 flex-col justify-evenly ml-4">
                    <p className="text-tcolor font-bold text-xl">日時</p>
                    <p className="text-tcolor font-bold text-xl">場所</p>
                    <p className="text-tcolor font-bold text-xl">サイズ</p>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>


        <ul className="h-40 bg-white flex sm-max:overflow-x-auto sm-max:space-x-4 sm:overflow-y-auto sm:flex-col sm:space-y-4 sm:w-56 sm:h-full sm-max:py-2 px-2 pb-2 sm:mr-auto">
          {t.map((value, index) => (
            <div className="sm-max:w-40 sm-max:h-full sm:w-full sm:aspect-square flex-none flex flex-col items-center">
              <img src="https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/4206da66a0e5deca9115d19a4bc0c63f.png" className="w-full sm-max:h-28 sm:h-56 object-cover" />
              <p className="h-8 text-tcolor font-bold text-lg">001 カサゴ</p>
            </div>
          ))}

        </ul>
      </div>
    </>
  );
};

export default PictureBook;