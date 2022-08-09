/*  Diary/index */
import React from 'react';
import Title from "../../components/Title";

// ユーザーページ
const DiaryList = () => {
  const c = [1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1]
  return (
    <>
    <div className="bg-white w-full ml-2 mt-4">
      <h1 className="text-2xl font-bold">釣り日誌</h1>
      <p className="font-bold text-sm">39件の記録</p>
    </div>
      <ul className="flex flex-col w-full p-2">
        {c.map(() => {
          return (
            <Diary/>
          )
        })}
      </ul>
    </>
  );
};

const Diary = () => {

  return (
    <li className="h-16 flex flex-row my-3 w-full pr-32">
        <img src="https://monusco.unmissions.org/sites/default/files/styles/full_width_image/public/field/image/20201023_120152.jpg?itok=LkjrZ3rj" className="mr-2 h-16 aspect-ratio" />

        <div className="flex flex-col w-full h-18 pl-2">
            <p className="truncate font-bold">タイトルは長くなると...になるよ</p>
            <p className="text-xs font-semibold text-gray-600 truncate">アジ20cm サバ4cm</p>
            <p className="text-xs text-gray-600 truncate">3日前</p>
        </div>
    </li>
)
}

export default DiaryList;