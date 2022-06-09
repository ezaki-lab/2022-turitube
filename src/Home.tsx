/*  Home.js */
import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  const test_env = process.env.BASENAME;
  return (
    <>
      <h1>{test_env}</h1>
      <div>
        新規登録は<Link to={`/register/`}>こちら</Link>
      </div>
      <div>
        user <Link to={`/user/kosakae256`}>こちら</Link>
      </div>
    </>
  );
};

export default Home;