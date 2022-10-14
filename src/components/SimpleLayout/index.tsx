import React from 'react';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom"
import Back from "../../img/icons/back.png";

const SimpleLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen overflow-auto">
                <div className="w-full h-12 fixed top-0 bg-basic flex flex-row items-center p-2 z-50">
                    <Link to="/library">
                        <img src={Back} className="h-8 mx-1" />
                    </Link>
                </div>
                <div className="flex-grow bg-white pt-12">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default SimpleLayout;