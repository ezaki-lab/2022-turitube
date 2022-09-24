import { useRecoilState } from 'recoil';
import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import * as atom from '../../common/atom';

import HamburgerButton from "../../img/buttons/hamburger.png";
import CloseButton from "../../img/buttons/close.png";
import OptionModalButton from "../../img/buttons/option_modal.png";
import ProfileModalButton from "../../img/buttons/profile_modal.png";
import QuestModalButton from "../../img/buttons/quest_modal.png";
import AchiveModalButton from "../../img/buttons/achive_modal.png";
import LogoutButton from "../../img/buttons/logout.png";

import AchiveComponent from './Modals/achive';
import QuestComponent from './Modals/quest';
import ProfileComponent from './Modals/profile';

const HamburgerModal = () => {

  const [userId, setUserId] = useRecoilState(atom.user_id);
  const [isLogin, setIsLogin] = useRecoilState(atom.is_login);

  const Logout = () => {
    setUserId("");
    localStorage.setItem("userId", "");
    setIsLogin(false);
  };

  const [modalId, setModalId] = useState<number | null>(null);
  return (
    <>
      <div className="fixed z-10000">
        {modalId == 0 ? <div className="h-full w-full flex flex-col fixed items-center justify-center px-4 py-4 bg-black bg-opacity-40">
          <AchiveComponent setModalId={setModalId} enable={false} />
        </div> : <></>}
        {modalId == 1 ? <div className="h-full w-full flex flex-col fixed items-center justify-center px-4 py-4 bg-black bg-opacity-40">
          <QuestComponent setModalId={setModalId} enable={false} />
        </div> : <></>}
        {modalId == 2 ? <div className="h-full w-full flex flex-col fixed items-center justify-center px-4 py-4 bg-black bg-opacity-40">
          <ProfileComponent setModalId={setModalId} enable={false} />
        </div> : <></>}

      </div>

      <input type="checkbox" id="hamburger" className="modal-toggle" />
      <div className={`modal ${modalId != null ? "hidden" : ""}`} id="hamburger">
        <div className="rounded-2xl w-full max-w-sm max-h-96 m-4 h-5/6 bg-white flex flex-col">
          <div className="w-full h-12 flex justify-center items-center bg-basic rounded-t-2xl">
            <h3 className="text-white text-xl font-bold">メニュー</h3>
          </div>

          <div className="flex-auto h-10 w-full flex flex-row justify-center items-center">
            <div className="h-full w-1/2 flex flex-col justify-around items-end">
              <div className="mx-2 my-1 h-10 active:animate-button-push">
                <img src={OptionModalButton} className="h-full" />
              </div>
              <div className="mx-2 my-1 h-10 active:animate-button-push">
                <img src={QuestModalButton} className="h-full" onClick={() => setModalId(1)} />
              </div>
              <Link to="/room/dev_room" className="mx-2 my-1 h-10 active:animate-button-push">
                <img src={OptionModalButton} className="h-full" />
              </Link>
              <div className="mx-2 my-1 h-10 active:animate-button-push">
                <img src={OptionModalButton} className="h-full" />
              </div>
            </div>
            <div className="h-full w-1/2 flex flex-col justify-around items-start">
              <div className="mx-2 my-1 h-10 active:animate-button-push" onClick={() => setModalId(2)}>
                <img src={ProfileModalButton} className="h-full" />
              </div>
              <button className="mx-2 my-1 h-10 active:animate-button-push" onClick={() => setModalId(0)}>
                <img src={AchiveModalButton} className="h-full" />
              </button>
              <Link to="/debug" className="mx-2 my-1 h-10 active:animate-button-push">
                <img src={OptionModalButton} className="h-full" />
              </Link>
              <button className="mx-2 my-1 h-10 active:animate-button-push" onClick={() => {Logout()}}>
                <img src={LogoutButton} className="h-full" />
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center w-full h-12 pb-2">
            <label htmlFor="hamburger" className="h-10 active:animate-button-push">
              <img src={CloseButton} className="h-full" />
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default HamburgerModal;