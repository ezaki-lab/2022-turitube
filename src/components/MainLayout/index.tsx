import { useRecoilState } from 'recoil';
import React from 'react';
import BottomAppbar from './bottomAppBar';
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <>
            <Outlet />
            <BottomAppbar />
        </>
    )
}
    
export default MainLayout;