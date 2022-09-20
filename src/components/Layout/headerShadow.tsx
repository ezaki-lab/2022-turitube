import React from 'react';
import { Outlet, Link } from "react-router-dom";

const HeaderShadow = () => {
  return (
    <>
      <div className="fixed z-50 w-full h-14 bg-white drop-shadow-md">
      </div>
      <Outlet />
    </>
  )
}

export default HeaderShadow;