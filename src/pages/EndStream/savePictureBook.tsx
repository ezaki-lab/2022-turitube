import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Calendar from "../../img/icons/calendar.png";
import Fish from "../../img/icons/name.png";
import Pin from "../../img/icons/pin.png";
import Measure from "../../img/icons/measure.png";
import Kari5 from "../../img/kari5.png";
import TitleHeader from '../../components/TitleHeader';
import { useNavigate } from 'react-router-dom';

// Example - example.jsx
const SavePictureBook = () => {
  //const [userId, setUserId] = useRecoilState(atom.user_id);
  const navigate = useNavigate();
  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <TitleHeader title="図鑑の登録" />
      <div className="w-full h-full flex flex-col mt-14 pb-14">
        <h2 className="mx-auto h-8 text-basic font-bold text-xl">本日釣った魚を図鑑に記録しました！</h2>
        <ul className="w-full h-2 flex-auto sm-max:overflow-y-auto sm:overflow-x-auto flex sm-max:flex-col sm:flex-row sm-max:space-y-4 sm:space-x-4 pb-1 px-4">
          {[1, 1, 1, 1, 1].map((v, i) => {
            return (
              <li className="carousel-item sm-max:w-full sm:w-96 h-96 sm:h-full carousel-item" id={`item${i}`} key={i}>
                <div className="rounded-box w-full h-full bg-white flex flex-col drop-shadow-xl">
                  <img src={Kari5} className="w-full h-4 flex-auto object-contain bg-black rounded-t-2xl mb-1" />
                  <Detail Image={Fish} data="タイ" />
                  <Detail Image={Calendar} data="2022/09/15 22:23" />
                  <Detail Image={Pin} data="ポンツーン号" />
                  <Detail Image={Measure} data="12cm" />
                </div>
              </li>
            )
          })}
        </ul>
        <div className="h-12 w-full flex justify-center space-x-4 items-center px-8 border-t border-gray sticky bottom-0" >
          <button className="bg-basic text-white font-bold p-2 px-4 text-md rounded-xl w-28 active:animate-button-push" onClick={() => {navigate("/")}}>終わる！</button>
        </div>
      </div>

    </>
  );
}

const Detail = ({ Image, data }) => {
  return (
    <div className="flex flex-row items-center mb-1 space-x-3 ml-2">
      <img src={Image} className="h-6" />
      <p className="text-tcolor text-lg sm:text-lg">{data}</p>
    </div>
  )
}

export default SavePictureBook;