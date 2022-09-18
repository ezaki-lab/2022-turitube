import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import * as atom from '../../../common/atom';
import BackHeader from '../../../components/BackHeader';
import { Link } from 'react-router-dom';
import TitleHeader from '../../../components/TitleHeader';
import ProgressBar from '../../../components/ProgressBar';
import Title from '../../../components/Title';
import AchiveComponent from '../../../components/Layout/Modals/achive';

// クエスト - index
const Achive = () => {

  return (
    <>
      <TitleHeader title="実績" />
      <div className="h-full w-full flex flex-col items-center justify-center px-8 pt-16 pb-16">
          <AchiveComponent />
      </div>
    </>
  );
};

export default Achive;