import { useRecoilState } from 'recoil';
import * as atom from '../../../common/atom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Url from '../../../utils/url';

import { useParams } from 'react-router-dom';
import BackHeader from '../../../components/BackHeader';
import Calendar from "../../../img/icons/calendar.png";
import Pin from "../../../img/icons/pin.png";
import Measure from "../../../img/icons/measure.png";
import SumFish from "../../../img/icons/sum_fish.png";
import MaxSize from "../../../img/icons/max_size.png";
import StabbedPin2 from "../../../img/icons/stabbed_pin2.png";

interface Book {
  datetime: string,
  place_name: string,
  size: number,
  img_name: string,
  max_size: number
}

// 図鑑 - index
const PictureBookContent = () => {
  const { fishId } = useParams();
  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [book, setBook] = useState<Book[]>();
  const [maxSize, setMaxSize] = useState<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get(Url("/picture_book"), {
      params: {
        user_id: userId,
        fish_id: fishId
      }
    }).then((res) => {
      console.log(res.data)
      setBook(res.data.book.data);
      setMaxSize(res.data.max_size);
    })
  }, []);

  useEffect(() => {
    if (book) {
      setReady(true);
    }
  }, [book]);

  if (!ready) return (<></>)

  return (
    <>
      <BackHeader title="図鑑" path="/picture_book" />
      <div className="sm-max:w-full sm-max:h-full pt-16 flex sm-max:flex-col sm:flex-row sm:h-full">
        <div className="sm-max:h-4 flex-auto flex flex-col sm:w-2 p-2 sm:flex-auto sm:h-full">
          <div className="h-full w-full bg-white">
            <ul className="sm-max:w-full h-full carousel sm:carousel-vertical carousel-center">
              {book.map((v, i) => {
                return (
                  <li className="carousel-item sm-max:w-[75%] sm:h-[75%] p-2 carousel-item" id={`item${i}`} key={i}>
                    <div className="rounded-box w-full h-full bg-white flex flex-col drop-shadow-xl">
                      <img src={`${Url("/img/stream_photo/")}${v.img_name}`} className="w-full h-4 flex-auto object-contain bg-black rounded-t-2xl mb-1" />
                      <Detail Image={Calendar} data={v.datetime} />
                      <Detail Image={Pin} data={v.place_name} />
                      <Detail Image={Measure} data={`${!v.size ? "--" : v.size}cm`} />
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center sm-max:w-full sm-max:h-8 sm:w-10 sm:h-full">
          <div className="flex sm-max:flex-row sm:flex-col justify-start pt-2 sm:gap-y-2 sm-max:gap-x-2 sm-max:overflow-x-auto sm:overflow-y-auto sm:h-full sm-max:pl-1">
            {
              book.map((v, i) => {
                return (
                  <a href={`#item${i}`} className="btn btn-xs sm-max:flex-none bg-gray-dark hover:bg-gray-dark" key={i} id={`item${i}`}>{i + 1}</a>
                )
              })}
          </div>
        </div>
        <div className="sm-max:h-40 sm:w-64 sm:h-full p-2">
          <div className="h-full w-full bg-white relative shadow-2xl">
            <h3 className="mx-auto text-lg text-tcolor font-bold pl-2">累計情報</h3>
            <Detail Image={SumFish} data={`${book.length}匹`} />
            <Detail Image={MaxSize} data={`${!maxSize ? "--" : maxSize}cm`} />
            <img src={StabbedPin2} className="absolute top-1 right-1 w-8" />
          </div>
        </div>
      </div>
    </>
  )
};

const Detail = ({ Image, data }) => {
  return (
    <div className="flex flex-row items-center mb-1 space-x-3 ml-2">
      <img src={Image} className="h-6" />
      <p className="text-tcolor text-lg sm:text-lg">{data}</p>
    </div>
  )
}

export default PictureBookContent;