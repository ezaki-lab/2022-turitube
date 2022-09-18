import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import TitleHeader from '../../../components/TitleHeader';
import Item from '../../../components/Item';
import QuestComponent from '../../../components/Layout/Modals/quest';

// クエスト - index
const Quest = () => {
  useEffect(() => {
    ;
  }, []);

  return (
    <>
      <TitleHeader title="クエスト" />
      <div className="h-full w-full flex flex-col items-center justify-center pt-16 pb-16 px-8">
        <QuestComponent />
      </div>
    </>
  );
};

export default Quest;