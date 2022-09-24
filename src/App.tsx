import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { useRecoilState } from 'recoil';
import * as atom from './common/atom';

import { Loading } from './loading';
import Signin from './Signin';

import Home from "./pages/Home";
import PictureBook from './pages/PictureBook';
import Diary from './pages/Diary';
import Achive from './pages/Achive';
import Quest from './pages/Quest';
import PictureBookContent from "./pages/PictureBook/Content";
import DiaryContent from './pages/Diary/Content';
import Debug from "./pages/Debug";
import Room from './pages/Room';

import Hamburger from './components/Layout/hamburger';
import HeaderShadow from './components/Layout/headerShadow';
import TopLayout from './components/Layout/top';
import BottomLayout from './components/Layout/bottom';
import ExplainModal from './components/ExplainModal';

export const App = () => {
  const basename = process.env.BASENAME;
  const [ready, setReady] = useState(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

  // ログインしますよ～
  useEffect(() => {
    axios.get("https://ezaki-lab.cloud/~turitube/api/login", {
      params: {
        user_id: localStorage.getItem("userId")
      }
    }).then((res) => {
      // ユーザー(id準拠)が存在したらuserInfoに情報を書き込む
      if (res.data.status) {
        setUserInfo({ user_id: res.data.user_id });
        setIsLogin(true);
      }
      // ユーザーが存在しなかったらuserInfoとlocalStorageの情報を抹消
      else {
        localStorage.setItem("userId", "");
        setUserInfo({ user_id: "" });
      }
      setReady(true);
    })
  }, []);

  if (ready) {
    if (!isLogin) return (
      <BrowserRouter basename={basename}>
        <Signin />
      </BrowserRouter>)

    return (
      <BrowserRouter basename={basename}>
        <ExplainModal />
        <Routes>
          <Route element={<Hamburger />}>
            <Route element={<HeaderShadow />}>
              <Route element={<BottomLayout />}>
                <Route element={<TopLayout />}>
                  <Route index element={<Home />} />
                </Route>
                <Route path="/picture_book" element={<PictureBook />} />
                <Route path="/diary" element={<Diary />} />
                <Route path="/quest" element={<Quest />} />
                <Route path="/achive" element={<Achive />} />
                <Route path="/debug" element={<Debug />} />
              </Route>
              <Route path="picture_book/:fishId" element={<PictureBookContent />} />
              <Route path="diary/:diaryId" element={<DiaryContent />} />
            </Route>
          </Route>
          <Route path="room/:room_id" element={<Room />} />

        </Routes>
      </BrowserRouter>
    )
  }
  else return (<Loading />)

}

