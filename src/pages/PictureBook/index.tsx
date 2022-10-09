import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';
import React, { useEffect, useState } from 'react';
import UndeFined from "../../img/icons/picture_book_undefined.png";
import { Link } from 'react-router-dom';
import TitleHeader from '../../components/TitleHeader';
import axios from 'axios';
import Url from '../../utils/url';
import Kari11 from "../../img/kari11.jpeg";
import Kari12 from "../../img/kari12.png";
import Kari13 from "../../img/kari13.png";
import Kari14 from "../../img/kari14.png";
import Kari15 from "../../img/kari15.png";
import Kari16 from "../../img/kari16.png";
import Kari17 from "../../img/kari17.png";

// 図鑑 - index
const PictureBook = () => {
  const [books, setBooks] = useState({});
  const [userId, setUserId] = useRecoilState(atom.user_id);

  const kariImg = {
    "001": Kari14,
    "002": Kari13,
    "003": Kari16,
    "004": Kari17,
    "005": UndeFined,
    "006": UndeFined,
    "007": UndeFined,
    "008": UndeFined,
    "009": Kari11,
    "010": UndeFined,
    "011": UndeFined,
    "012": UndeFined,
    "013": Kari12,
    "014": UndeFined,
    "015": UndeFined,
  }

  useEffect(() => {
    axios.get(Url("/books"), {
      params: {
        user_id: userId
      }
    }).then((res) => {
      setBooks(res.data.book);
    })
  }, []);

  return (
    <>
      <TitleHeader title="図鑑" />
      <div className="w-full h-full flex flex-col items-center justify-center pt-14 sm:pb-12">
        <div className="h-full w-full px-4 max-w-7xl flex flex-wrap items-center overflow-y-auto sm-max:pb-56">
          {Object.keys(books).map((key, index) => {
            return (
              <Link to={`/picture_book/${key}`} className="w-1/3 sm:w-1/5 lg:w-1/5 xl:w-1/6 p-1 sm:p-1 flex flex-col justify-center items-center" key={key}>
                <div className="w-full aspect-square flex flex-col items-center">
                  <div className="rounded-2xl border-4 lg:border-8 border-gray">
                    <img src={kariImg[key]} className="object-cover aspect-square h-full w-full rounded-xl" />
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