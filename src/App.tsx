import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Diary from "./pages/Diary";
import Notification from "./pages/Notification";
import NotFound from "./NotFound";
import User from "./pages/User";
import { RecoilRoot } from "recoil"
import MainLayout from './components/MainLayout';
import { ContextSocketProvider } from './common/socContext';


export const App = () => {
  const basename = process.env.BASENAME
  return (
    <ContextSocketProvider>
      <RecoilRoot>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/user/:username" element={<User />} />
          </Route>
          { /* 404用 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    </ContextSocketProvider>
    
  )
}

