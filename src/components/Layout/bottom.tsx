import { useRecoilState } from 'recoil';
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import HomeButton from "../../img/buttons/home.png";
import AchiveButton from "../../img/buttons/achive.png";
import QuestButton from "../../img/buttons/quest.png";
import StreamButton from "../../img/buttons/stream.png";
import PictureBookButton from "../../img/buttons/picture_book.png";
import DiaryButton from "../../img/buttons/diary.png";

import PictureBookSmallButton from "../../img/buttons/picture_book_small.png";
import DiarySmallButton from "../../img/buttons/diary_small.png";
import AchiveSmallButton from "../../img/buttons/achive_small.png";
import HomeButton2 from "../../img/buttons/home_2.png";

import QuestBig from "../../img/buttons/quest_old.png";

import StreamStartComponent from './Modals/streamStart';

const BottomLayout = () => {
  return (
    <>
      <StreamStartComponent />
      <div className="fixed z-100">
        <div className="w-full h-0 fixed flex flex-row justify-between px-1 mb-1 items-end bottom-0 sm:hidden">
          <Link to="/" className="w-28 flex-auto max-w-[180px] active:animate-button-push">
            <img src={HomeButton2} />
          </Link>
          <Link to="/quest" className="w-20 flex-auto mb-1 max-w-[160px] active:animate-button-push">
            <img src={QuestBig} />
          </Link>
          <label htmlFor="start_stream" className="w-28 flex-auto max-w-[180px] active:animate-button-push">
            <img src={StreamButton} />
          </label>
          <div className="flex flex-col w-14 flex-auto max-w-[80px]">
            <Link to="/picture_book" className="w-full active:animate-button-push">
              <img src={PictureBookSmallButton} />
            </Link>
            <Link to="/diary" className="w-full active:animate-button-push">
              <img src={DiarySmallButton} />
            </Link>
            <Link to="/achive" className="w-full active:animate-button-push">
              <img src={AchiveSmallButton} />
            </Link>
          </div>
        </div>


        {/*画面が大きい時 */}
        <div className="w-full fixed h-10 flex flex-row justify-center items-center bottom-0 sm-max:hidden bg-white shadow-[0_-4px_4px_rgba(0,0,0,0.2)]">
          <Link to="/" className="w-28 max-w-[160px] flex-auto flex items-center justify-center active:animate-button-push -mt-6 ">
            <img src={HomeButton} />
          </Link>
          <Link to="/picture_book" className="w-28 max-w-[160px] flex-auto flex items-center justify-center active:animate-button-push -mt-6 ">
            <img src={PictureBookButton} />
          </Link>
          <Link to="/diary" className="w-28 max-w-[160px] flex-auto flex items-center justify-center active:animate-button-push -mt-6 ">
            <img src={DiaryButton} />
          </Link>
          <Link to="/achive" className="w-28 max-w-[160px] flex-auto flex items-center justify-center active:animate-button-push -mt-6 ">
            <img src={AchiveButton} />
          </Link>
          <Link to="/quest" className="w-28 max-w-[160px] flex-auto flex items-center justify-center active:animate-button-push -mt-6 ">
            <img src={QuestButton} />
          </Link>
          <label htmlFor="start_stream" className="w-28 max-w-[160px] flex-auto flex items-center justify-center active:animate-button-push -mt-6 ">
            <img src={StreamButton} />
          </label>
        </div>

      </div>

      <Outlet />
    </>
  )
}

export default BottomLayout;