import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Diary from "./pages/Diary";
import Notification from "./pages/Notification";
import NotFound from "./NotFound";
import User from "./pages/User";
import Room from './pages/Room';
import { RecoilRoot } from "recoil"
import MainLayout from './components/MainLayout';

export const App = () => {
  const basename = process.env.BASENAME
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  return (
    <RecoilRoot>
      <BrowserRouter basename={basename}>
        <Routes>{ready
          ?
          <>
            <Route element={<MainLayout />}>

              <Route index element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/user/:username" element={<User />} />
              { /* 404用 */}
              <Route path="*" element={<NotFound />} />

            </Route>
            <Route path="/room/:room_id" element={<Room />} />
          </>
          : <></>}

        </Routes>
      </BrowserRouter>

    </RecoilRoot>

  )
}

