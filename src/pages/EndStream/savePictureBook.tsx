import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import Calendar from "../../img/icons/calendar.png";
import Fish from "../../img/icons/name.png";
import Pin from "../../img/icons/pin.png";
import Measure from "../../img/icons/measure.png";
import TitleHeader from '../../components/TitleHeader';
import { useNavigate } from 'react-router-dom';
import Url from '../../utils/url';
import axios from 'axios';
import * as atom from '../../common/atom';


// Example - example.jsx
const SavePictureBook = ({ imgDataList }) => {
  const navigate = useNavigate();
  const [pictureBookData, setPictureBookData] = useState([]);
  const [ready, setReady] = useState<boolean>(false);
  const [me] = useRecoilState(atom.me);

  // 読み込み
  useEffect(() => {
    setPictureBookData(imgDataList.filter((output, index) => {
      return output.type == "book";
    }))
    setReady(true);
  }, []);

  const end = () => {
    axios.post(Url("/picture_book"), {
      data: pictureBookData,
      user_id: me.user_id,
      user_name: me.user_name
    }).then((res) => {
      navigate("/");
    })
  }

  if (!ready) return <></>
  return (
    <>
      <TitleHeader title="図鑑の登録" />
      <div className="w-full h-full flex flex-col mt-14 pb-14">
        {!pictureBookData.length
          ? <h2 className="mx-auto h-8 text-basic font-bold text-xl">配信中に魚を撮ると、図鑑に記録できます！</h2>
          : <h2 className="mx-auto h-8 text-basic font-bold text-xl">本日釣った魚を図鑑に記録しました！</h2>}
        <ul className="w-full h-2 flex-auto sm-max:overflow-y-auto sm:overflow-x-auto flex sm-max:flex-col sm:flex-row sm-max:space-y-4 sm:space-x-4 pb-1 px-4">
          {pictureBookData.map((v, i) => {
            return (
              <Book data={v} index={i} key={i} setPictureBookData={setPictureBookData} />
            )
          })}
        </ul>
        <div className="h-12 w-full flex justify-center space-x-4 items-center px-8 border-t border-gray sticky bottom-0" >
          <button className="bg-basic text-white font-bold p-2 px-4 text-md rounded-xl w-28 active:animate-button-push" onClick={() => end()}>終わる！</button>
        </div>
      </div>
    </>
  );
}

const Book = ({ data, index, setPictureBookData }) => {
  const [number, setNumber] = useState<number | string>("--");

  // サイズ変更時
  useEffect(() => {
    console.log(number)
    if (number == "") setNumber("--");
    else setPictureBookData((rev) =>
      rev.map((obj, i) => (i == index ? {...obj, size: number} : obj))
    );
  }, [number]);

  return (
    <li className="carousel-item sm-max:w-full sm:w-96 h-96 sm:h-full carousel-item">
      <div className="rounded-box w-full h-full bg-white flex flex-col drop-shadow-xl">
        <img src={Url(`/img/stream_photo/${data.img_name}`)} className="w-full h-4 flex-auto object-contain bg-black rounded-t-2xl mb-1" />
        <Detail Image={Fish} data={data.fish} />
        <Detail Image={Calendar} data={data.datetime} />
        <Detail Image={Pin} data={data.place_name} />
        <div className="flex flex-row items-center mb-1 space-x-3 ml-2">
          <img src={Measure} className="h-6" />
          <div className="flex flex-row">
            <input type="number" className="w-24 rounded-md pl-2 border-2 border-gray mr-2" placeholder="--" onChange={(event) => setNumber(event.target.value)}></input>
            <p className="text-tcolor text-lg sm:text-lg">cm</p>
          </div>
        </div>
      </div>
    </li>
  )
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