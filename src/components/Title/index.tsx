/*  Diary/index */
import React from 'react';

// ユーザーページ
const Title = ({title}) => {
  return (
    <>
      <h1 className="font-bold text-xl flex-1 ml-2 my-4">{title}</h1>
    </>
  );
};

export default Title;