import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./NotFound";
import User from "./pages/User";
import { RecoilRoot } from "recoil"

export const App = () => {
  const basename = process.env.BASENAME
  return (
    <RecoilRoot>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/user/:username" element={<User />} />

          { /* 404用 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}