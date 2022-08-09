/*  Book/index */
import React from 'react';
import { Link } from "react-router-dom";
import Unregistered from "../../img/icons/unregistered.png";

// 図鑑
const Book = () => {
  const fishes = [
    {
      id: 1,
      name: "サバ"
    },
    {
      id: 2,
      name: "タイ"
    },
    {
      id: 3,
      name: "アジ"
    },
    {
      id: 4,
      name: "マグロ"
    },
    {
      id: 5,
      name: "ブリ"
    },
    {
      id: 6,
      name: "サバ"
    },
    {
      id: 7,
      name: "タイ"
    },
    {
      id: 8,
      name: "アジ"
    },
    {
      id: 9,
      name: "マグロ"
    },
    {
      id: 10,
      name: "ブリ"
    },
    {
      id: 11,
      name: "サバ"
    },
    {
      id: 12,
      name: "タイ"
    },
    {
      id: 13,
      name: "アジ"
    },
    {
      id: 14,
      name: "マグロ"
    },
    {
      id: 15,
      name: "ブリ"
    }
  ]

  return (
    <>
      <div className="bg-white w-full ml-2 mt-4">
        <h1 className="text-2xl font-bold">釣り図鑑</h1>
      </div>
      <div className="flex flex-row flex-wrap justify-evenly mt-4">
        {fishes.map((fish, index) => (
          <Panel fish={fish} key={fish.id} />
        ))}
      </div>
    </>
  );
};

const Panel = ({ fish }) => {
  return (
    <>
      <div className="flex flex-col w-20 sm:w-32 md:w-40 lg:w-48 xl:w-64 m-4">
        <img src={Unregistered} className="w-full rounded-xl" />
        <div className="flex flex-row justify-between">
          <p className="font-bold text-sm">{('000' + fish.id).slice(-3)}</p>
          <p className="font-bold text-sm">{fish.name}</p>
        </div>
      </div>
    </>
  )
}

export default Book;