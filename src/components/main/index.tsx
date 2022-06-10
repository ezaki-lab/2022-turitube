import { useRecoilState } from 'recoil';
import React from 'react';
import { Link } from "react-router-dom";
import * as atom from '../../common/atom';
import Ffffff from "./icons/ffffff.png";

const BottomAppbar = () => {

    // bottomappbarの情報(画像など含む)
    const bottom_apps = [{
        text: "ホーム",
        to: "/user/kosakae256",
        icon: Ffffff,
    },
    {
        text: "マップ",
        to: "/user/kosakae256",
        icon: Ffffff,
    },
    {
        text: "釣り",
        to: "/user/kosakae256",
        icon: Ffffff,
    },
    {
        text: "通知",
        to: "/user/kosakae256",
        icon: Ffffff,
    },
    {
        text: "日誌",
        to: "/user/kosakae256",
        icon: Ffffff,
    }]

    return (
        <>
            <nav className="w-full h-16 ext-1xl flex flex-row bottom-0 z-50 fixed">
                {bottom_apps.map((app, index) => {
                    return (
                        <Item text={app.text} to={app.to} icon={app.icon} key={app.text} />
                    )
                })}
            </nav>
        </>
    );
};

const Item = ({ text, to, icon }) => {
    return (
        <Link to={to} className="w-full h-full border-t">
            <button className="w-full h-full flex flex-col justify-around items-center">
                <img
                    src={icon}
                    alt={"a"}
                    width="30rem"
                    className="pointer-events-none"
                />
                <div className="text-xs text-basic inline-block align-bottom">
                    {text}
                </div>
            </button>
        </Link>
    )
}
export default BottomAppbar;