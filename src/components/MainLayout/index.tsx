import { useRecoilState } from 'recoil';
import React from 'react';
import BottomAppbar from './bottomAppBar';
import { Outlet } from "react-router-dom"
import Header from './header';
import Modal from './modal';

const MainLayout = () => {
    return (
        <>
            <Modal />
            <div className="flex flex-col h-screen overflow-auto">
                <Header />
                <div className="flex-grow bg-white pt-12 pb-28">
                    <Outlet />
                </div>
                <BottomAppbar />
            </div>
        </>
    )
}

export default MainLayout;