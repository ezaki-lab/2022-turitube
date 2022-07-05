/*  Diary/index */
import React from 'react';
import Title from "../../components/Title";

// ユーザーページ
const DiaryList = () => {
  const c = [1, 1, 1, 1, 1, 1, 1,1,1,1,1,1,1,1]
  return (
    <>
    <div className="fixed bg-white w-full">
      <Title title="自分の日誌" />
    </div>
      <ul className="flex flex-col w-full p-2 mt-12">
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
    <li className="h-16 flex flex-row my-1 w-full pr-32">
        <img src="https://monusco.unmissions.org/sites/default/files/styles/full_width_image/public/field/image/20201023_120152.jpg?itok=LkjrZ3rj" className="mr-2 h-14 aspect-ratio" />

        <div className="flex flex-col w-full h-10">
            <p className="truncate">タイトルkdlsfkjfljdslfsladfjadfkljdfljdkfkdasfkad</p>
            <p className="text-xs text-gray-600 truncate">あうざーだよ</p>
        </div>
    </li>
)
}

export default DiaryList;