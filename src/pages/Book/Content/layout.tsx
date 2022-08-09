/*  Book/index */
import React from 'react';
import { Link } from "react-router-dom";
import Back from "../../../img/icons/back.png";
import Header from "./header"

// 図鑑のレイアウト
const Layout = ({children}) => {
  return (
    <>
            <div className="flex flex-col h-screen overflow-auto">
            <Header />
            <div className="flex-grow bg-bgray pt-20 px-10">
                {children}
            </div>
        </div>
    </>
)
};

export default Layout;