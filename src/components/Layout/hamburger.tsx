import { useRecoilState } from 'recoil';
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import HamburgerButton from "../../img/buttons/hamburger.png";
import HamburgerModal from './hamburgerModal';

const Hamburger = () => {
  return (
    <>
      <HamburgerModal />
      <div className="fixed z-100 w-full h-14 bg-white drop-shadow-md">
        <div className="w-12 h-12 fixed flex flex-col items-center mx-2 my-1 top-0 right-0">
          <label htmlFor="hamburger" className="w-full h-8 mb-1 sm:mb-4 active:animate-button-push">
            <img src={HamburgerButton} />
          </label>
        </div>

      </div>
      <Outlet />
    </>
  )
}

export default Hamburger;