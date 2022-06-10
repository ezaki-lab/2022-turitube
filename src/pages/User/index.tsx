/*  User */
import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'

// ユーザーページ
const User = () => {
  const { username } = useParams()
  return (
    <>
      <h1>{username}</h1>
    </>
  );
};

export default User;