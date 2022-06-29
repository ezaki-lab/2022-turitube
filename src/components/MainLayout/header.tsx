import { useRecoilState } from 'recoil';
import React from 'react';
import BottomAppbar from './bottomAppBar';
import { Outlet } from "react-router-dom"
import Logo from "./icons/mainlogo.png";

const Header = () => {
    return (
        <>
            <div className="w-full h-12 fixed top-0 bg-basic flex flex-row items-center p-2 z-50">
                <img
                    src={Logo}
                    alt={"つりちゅーぶ"}
                    className="pointer-events-none h-8 flex-none"
                />
                <div className="ml-auto flex-row flex">
                    <div className="mx-2">i1</div>
                    <div className="mx-2">i2</div>
                </div>
            </div>
        </>
    )
}

export default Header;