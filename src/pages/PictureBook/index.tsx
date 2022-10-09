import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import React, { useEffect, useState } from 'react';
import UndeFined from "../../img/icons/picture_book_undefined.png";
import { Link } from 'react-router-dom';
import TitleHeader from '../../components/TitleHeader';
import axios from 'axios';
import Url from '../../utils/url';

interface Books {
  [id: string]: {
    data: [{
      img: string
    }],
    name: string
  }
}

// 図鑑 - index
const PictureBook = () => {
  const [books, setBooks] = useState<Books>();
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get(Url("/books"), {
      params: {
        user_id: userId
      }
    }).then((res) => {
      setBooks(res.data.book);
      console.log(res)
      setReady(true);
    })
  }, []);

  if (!ready) return <></>
  return (
    <>
      <TitleHeader title="図鑑" />
      <div className="w-full h-full flex flex-col items-center justify-center pt-14 sm:pb-12">
        <div className="h-full w-full px-4 max-w-7xl flex flex-wrap items-center overflow-y-auto sm-max:pb-56">
          {Object.keys(books).map((key, index) => {
            return (
              <Link to={books[key].data.length ? `/picture_book/${key}` : `/picture_book`} className="w-1/3 sm:w-1/5 lg:w-1/5 xl:w-1/6 p-1 sm:p-1 flex flex-col justify-center items-center" key={key}>
                <div className="w-full aspect-square flex flex-col items-center">
                  <div className="rounded-2xl border-4 lg:border-8 border-gray">
                    <img src={!books[key].data.length ? UndeFined : Url(`/img/stream_photo/${books[key].data[0].img}`)} className="object-cover aspect-square h-full w-full rounded-xl" />
                  </div>
                </div>
                <p className="text-tcolor font-bold text-xs sm-max:text-xxs lg:text-base">{key} {books[key].name}</p>
              </Link>
            )
          })}
        </div>
      </div>

    </>
  );
};

export default PictureBook;