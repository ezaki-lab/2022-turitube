import { useRecoilState } from 'recoil';
import React from 'react';
import { Link } from "react-router-dom";
import * as atom from '../../common/atom';
import HomeActive from "./icons/home.active.png";
import HomeInactive from "./icons/home.inactive.png";
import MapActive from "./icons/map.active.png";
import MapInactive from "./icons/map.inactive.png";
import DiaryActive from "./icons/diary.active.png";
import DiaryInactive from "./icons/diary.inactive.png";
import NotificationActive from "./icons/notification.active.png";
import NotificationInactive from "./icons/notification.inactive.png";
import useIdRoute from '../../hooks/useIdRoute';

const BottomAppbar = () => {
    const head_route = useIdRoute()

    // bottomappbarの情報(画像など含む)
    const bottom_apps = [{
        id: "home",
        text: "ホーム",
        to: "/",
        active: HomeActive,
        inactive: HomeInactive,
    },
    {
        id: "map",
        text: "マップ",
        to: "/map",
        active: MapActive,
        inactive: MapInactive,
    },
    {
        id: "fishing",
        text: "fishing",
        to: "/select_quest",
        active: DiaryActive,
        inactive: DiaryInactive
    },
    {
        id: "notification",
        text: "通知",
        to: "/notification",
        active: NotificationActive,
        inactive: NotificationInactive,
    },
    {
        id: "diary",
        text: "日誌",
        to: "diary",
        active: DiaryActive,
        inactive: DiaryInactive
    }]

    return (
        <>
            <nav className="w-full h-16 ext-1xl flex flex-row bottom-0 z-50 fixed">
                {bottom_apps.map((app, index) => {
                    // そのページに居たら
                    if (head_route == app.id){
                        return (
                            <Item text={app.text} to={app.to} icon={app.active} key={app.text} />
                        )
                    }
                    else{
                        return (
                            <Item text={app.text} to={app.to} icon={app.inactive} key={app.text} />
                        )
                    }
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