import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Loading } from './loading';

import Home from "./pages/SPA/Home";
import PictureBook from './pages/SPA/PictureBook';
import Diary from './pages/SPA/Diary';
import Achive from './pages/SPA/Achive';
import Quest from './pages/SPA/Quest';
import PictureBookContent from "./pages/SPA/PictureBook/Content";
import DiaryContent from './pages/SPA/Diary/Content';

import Hamburger from './components/Layout/hamburger';

import Map from "./pages/Map";
import Library from "./pages/Library";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import NotFound from "./NotFound";
import User from "./pages/User";
import Room from './pages/Room/index';
import Book from './pages/Book';
import BookContent from './pages/Book/Content';
import Result from './pages/StreamResult/Result';
import Coercion from './pages/StreamResult/Coercion';

import QuestBoard from './components/QuestBoard';

import Signin from './pages/Signin';
import { useRecoilState } from 'recoil';
import * as atom from './common/atom';

import MainLayout from './components/MainLayout';
import SimpleLayout from './components/SimpleLayout';
import TopLayout from './components/Layout/top';
import BottomLayout from './components/Layout/bottom';

import { UseLogin } from './hooks/useLogin';
import ExplainModal from './components/ExplainModal';

export const App = () => {
  const basename = process.env.BASENAME;
  const [ready, setReady] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

  UseLogin()

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1);
  }, []);

  // ブラウザルートの指定
  return (
    <div className="font-body">
      <BrowserRouter basename={basename}>
        {!ready ?
          <Loading />
          :
          <>
            <ExplainModal />
            <Routes> {userInfo.user_id
              ?
              (<>
                <Route element={<Hamburger />}>
                  <Route element={<BottomLayout />}>
                    <Route element={<TopLayout />}>
                      <Route index element={<Home />} />
                    </Route>
                    <Route path="/picture_book" element={<PictureBook />} />
                    <Route path="/diary" element={<Diary />} />
                    <Route path="/quest" element={<Quest />} />
                    <Route path="/achive" element={<Achive />} />
                  </Route>
                  <Route path="picture_book/:fishId" element={<PictureBookContent />} />
                  <Route path="diary/:diaryId" element={<DiaryContent />} />
                </Route>

                <Route element={<MainLayout />}>
                  <Route path="/map" element={<Map />} />
                  <Route path="/notification" element={<Notification />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/user/:username" element={<User />} />
                  { /* 404用 */}
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route element={<SimpleLayout />}>
                  <Route path="/book" element={<Book />} />
                </Route>

                <Route path="/book/:book_id" element={<BookContent />} />
                <Route path="/coercion" element={<Coercion />} />
                <Route path="/result" element={<Result />} />
                <Route path="/questboard" element={<QuestBoard can_order_quest={true} />} />

                <Route path="/room/:room_id" element={<Room />} />
              </>)
              :
              (<>
                <Route path="*" element={<Signin />} />
              </>)
            }

            </Routes>
          </>

        }

      </BrowserRouter >
    </div >


  )
}

