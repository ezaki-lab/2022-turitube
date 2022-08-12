/*  Book/index */
import React from 'react';
import { Link } from "react-router-dom";
import Back from "../../../img/icons/back_blue.png";
import Share from "../../../img/icons/share.png";

// 図鑑のヘッダー
const Header = () => {
    return (
        <>
            <div className="w-full h-16 fixed top-0 bg-bgray flex flex-row items-center justify-between p-2 z-50">
                <div className="w-1/3">
                    <Link to="/diary">
                        <img src={Back} className="h-8 mx-1" />
                    </Link>
                </div>
                <div className="w-1/3">
                    <h1 className="text-basic text-4xl font-bold text-center">日誌</h1>
                </div>
                <div className="w-1/3">
                    <img src={Share} className="h-8 mr-0 ml-auto" />
                </div>
            </div>
        </>
    )
};

export default Header;