import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import NotFound from "./NotFound";
import User from "./User/index";

export const App = () => {
  const basename = process.env.BASENAME
  return (
  <BrowserRouter basename={basename}>
    <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/:username" element={<User />} />

        { /* 404用 */ }
        <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  )
}