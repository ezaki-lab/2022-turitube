import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Loading } from './loading';

import Home from "./pages/Home";
import Map from "./pages/Map";
import Library from "./pages/Library";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import NotFound from "./NotFound";
import User from "./pages/User";
import Room from './pages/Room/index';
import Diary from './pages/Diary';
import Book from './pages/Book';
import DiaryContent from "./pages/Diary/Content";
import BookContent from './pages/Book/Content';

import Login from './pages/Signin';
import { useRecoilState } from 'recoil';
import * as atom from './common/atom';

import MainLayout from './components/MainLayout';
import SimpleLayout from './components/SimpleLayout';

import { UseLogin } from './hooks/useLogin';

export const App = () => {
  const basename = process.env.BASENAME;
  const [ready, setReady] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

  UseLogin()

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  return (
    <BrowserRouter basename={basename}>
      {!ready ?
        <Loading />
        :
        <Routes> {userInfo.user_id
          ?
          (<>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/library" element={<Library />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/:username" element={<User />} />
              { /* 404用 */}
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<SimpleLayout />}>
              <Route path="/diary" element={<Diary />} />
              <Route path="/book" element={<Book />} />
            </Route>

            <Route path="/diary/:diary_id" element={<DiaryContent />} />
            <Route path="/book/:book_id" element={<BookContent />} />

            <Route path="/room/:room_id" element={<Room />} />
          </>)
          :
          (<>
            <Route element={<MainLayout />}>
              <Route path="*" element={<Login />} />
            </Route>
          </>)
        }

        </Routes>
      }

    </BrowserRouter>

  )
}

