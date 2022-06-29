import { useRecoilState } from 'recoil';
import React from 'react';
import BottomAppbar from './bottomAppBar';
import { Outlet } from "react-router-dom"
import Header from './header';

const MainLayout = () => {
    return (
        <>
            <div className="flex flex-col h-screen overflow-auto">
                <Header />
                <div className="flex-grow bg-white pt-12 pb-16">
                    <Outlet />
                </div>
                <BottomAppbar />
            </div>
        </>
    )
}

export default MainLayout;