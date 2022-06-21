import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Diary from "./pages/Diary";
import Notification from "./pages/Notification";
import NotFound from "./NotFound";
import User from "./pages/User";
import Chat from './pages/Room';
import { RecoilRoot } from "recoil"
import MainLayout from './components/MainLayout';

export const App = () => {
  const basename = process.env.BASENAME
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 100);
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route element={<MainLayout />}>
            {ready
              ? <>
                <Route index element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/user/:username" element={<User />} />
                <Route path="/chat/:room_id" element={<Chat />} />
                { /* 404用 */}
                <Route path="*" element={<NotFound />} />
              </>
              : <></>}

          </Route>
        </Routes>
      </BrowserRouter>

    </RecoilRoot>

  )
}

