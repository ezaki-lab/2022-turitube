import React from 'react';
import { Outlet, Link } from "react-router-dom";
import BackButton from "../../img/buttons/back.png";


const BackHeader = ({ path, title }) => {
  return (
    <>
      <div className="fixed z-100">
        <div className="h-16 fixed flex flex-row mx-2 top-1 left-0">
          <Link to={path} className="w-12">
            <img src={BackButton} />
          </Link>
          <div className="w-40 h-12 flex flex-row items-center">
            <div className="w-40 h-10 flex flex-row items-center justify-start bg-gray-dark rounded-r-full">
                <h3 className="font-bold text-sub text-xl ml-2">▶</h3>
                <h3 className="font-bold text-white text-xl ml-1">{title}</h3>
            </div>
          </div>

        </div>
      </div>
      <Outlet />
    </>
  )
}

export default BackHeader;