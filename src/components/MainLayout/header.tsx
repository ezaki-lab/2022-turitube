import { useRecoilState } from 'recoil';
import React from 'react';
import BottomAppbar from './bottomAppBar';
import { Outlet } from "react-router-dom"
import Logo from "./icons/mainlogo.png";
import Map from "../../img/icons/map.png";
import { Link } from "react-router-dom";

const Header = () => {
    const header_apps = [
        {
            id: "map",
            to: "/map",
            img: Map,
        },
        {
            id: "map2",
            to: "/map",
            img: Map,
        }]

    return (
        <>
            <div className="w-full h-12 fixed top-0 bg-basic flex flex-row items-center p-2 z-50">
                <img
                    src={Logo}
                    alt={"つりちゅーぶ"}
                    className="pointer-events-none h-8 flex-none"
                />
                <div className="ml-auto flex-row flex">
                    {header_apps.map((app, index) => (
                        <HeaderTab key={app.id} app={app} />
                    ))}
                </div>
            </div>
        </>
    )
}

const HeaderTab = ({ app }) => {
    return (
        <Link to={app.to}>
            <img src={app.img} className="mx-2 h-8"/>
        </Link>
    );
}

export default Header;