import React, { useState } from 'react';
import { Link } from "react-router-dom";
import History from "./history";
import Like from "./like";
import Book from "../../img/icons/notification.active.png";
import Diary from "../../img/icons/notification.inactive.png";

const apps = [
  {
    id: "diary",
    text: "自分の日誌",
    to: "/library/diary",
    icon: Diary
  },
  {
    id: "book",
    text: "自分の図鑑",
    to: "/library/book",
    icon: Book
  }
]

// ライブラリ (今は画面遷移テスト)
const Library = () => {
  return (
    <>
      <History />
      <SelectPage />
      <Like />
    </>

  )
}

const SelectPage = () => {
  return (
    <div className="flex flex-col w-full h-28 border-b-2 ">
      {apps.map((data, index) => (
        <Link key={data.to} to={data.to}>
          <div className="h-14 flex flex-row items-center">
          <img src={data.icon} width={30} className="mx-4 aspect-square" />
          <p className="flex-1">{data.text}</p>
        </div>
        </Link>
        
      ))}
    </div>
  )
}




export default Library;