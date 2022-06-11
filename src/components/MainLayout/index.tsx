import { useRecoilState } from 'recoil';
import React from 'react';
import BottomAppbar from './bottomAppBar';
import { Outlet } from "react-router-dom"
import Header from './header';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <BottomAppbar />
        </>
    )
}
    
export default MainLayout;