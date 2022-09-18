import { useRecoilState } from 'recoil';
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import useIdRoute from '../../hooks/useIdRoute';
import Coin from "../../img/icons/coin.png";
import Level from "../../img/icons/level.png";
import Name from "../../img/icons/name.png";

const TopLayout = () => {
  const head_route = useIdRoute();
  return (
    <>
      <div className="fixed z-100">
        <div className="w-[calc(100vw-70px)] flex-auto fixed h-8 flex flex-row justify-center items-center top-2 lg:h-10">
          <div className="w-1/3 max-w-xs h-full mx-1 rounded-full border-2 border-gray-dark flex items-center bg-background">
            <div className="w-full h-full rounded-full flex flex-row border border-white bg-gray-dark items-center">
              <img src={Name} className="h-4/5 ml-1" />
              <p className="text-white text-xxs sm:text-sm font-bold ml-1">kosakae</p>
            </div>
          </div>
          <div className="w-1/3 max-w-xs h-full mx-1 rounded-full border-2 border-gray-dark flex items-center bg-background">
            <div className="w-full h-full rounded-full flex flex-row border border-white bg-gray-dark items-center">
              <img src={Level} className="h-3/5" />
              <p className="text-white text-xxs sm:text-sm font-bold">Lv.20</p>
            </div>
          </div>
          <div className="w-1/3 max-w-xs h-full mx-1 rounded-full border-2 border-gray-dark flex items-center bg-background">
            <div className="w-full h-full rounded-full flex flex-row border border-white bg-gray-dark items-center">
              <img src={Coin} className="h-3/4" />
              <p className="text-white text-xxs sm:text-sm font-bold">2000</p>
            </div>
          </div>
        </div>

      </div>
      <Outlet />
    </>
  )
}

export default TopLayout;