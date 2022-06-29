import React from 'react';
import { Link } from "react-router-dom";
import HomeActive from "/img/icons/home.active.png";
import HomeInactive from "./icons/home.inactive.png";
import MapActive from "../../img/icons/map.active.png";
import MapInactive from "../../img/icons/map.inactive.png";
import LibraryActive from "../../img/icons/library.active.png";
import LibraryInactive from "../../img/icons/library.inactive.png";
import NotificationActive from "./icons/notification.active.png";
import NotificationInactive from "./icons/notification.inactive.png";
import Fish from "../../img/icons/fish.png";
import useIdRoute from '../../hooks/useIdRoute';


const BottomAppbar = () => {
    // bottomappbarの情報(画像など含む)
    const bottom_apps = [
        {
            id: "map",
            text: "マップ",
            to: "/map",
            active: MapActive,
            inactive: MapInactive,
        },
        {
            id: "library",
            text: "ライブラリ",
            to: "/library",
            active: LibraryActive,
            inactive: LibraryInactive
        }]

    return (
        <>
            <nav className="w-full h-16 bottom-0 z-50 fixed bg-gray-200">
                <div className="w-full h-full flex flex-row">
                    <NormalTab app={bottom_apps[0]} />
                    <CircleTab />
                    <NormalTab app={bottom_apps[1]} />
                </div>
            </nav>
        </>
    )
};

const NormalTab = ({ app }) => {
    const head_route = useIdRoute()
    // そのページにいたら
    if (head_route == app.id) {
        return (
            <Item text={app.text} to={app.to} icon={app.active} key={app.text} />
        )
    }
    else {
        return (
            <Item text={app.text} to={app.to} icon={app.inactive} key={app.text} />
        )
    }
}

const Item = ({ text, to, icon }) => {
    return (
        <Link to={to} className="w-full h-full">
            <button className="w-full h-full flex flex-col justify-around items-center">
                <img
                    src={icon}
                    alt={"a"}
                    width="55rem"
                    className="pointer-events-none"
                />
            </button>
        </Link>
    )
}

const CircleTab = () => {
    return (
        <Link to="/" className="w-full h-full justify-around items-center flex">
            <div className="rounded-full h-28 mb-12 bg-basic aspect-square justify-around items-center flex">
                <img 
                src={Fish}
                alt="クエスト選択"
                width="80rem"
                className="pointer-events-none"
                />
            </div>
        </Link>
    )
}

export default BottomAppbar;