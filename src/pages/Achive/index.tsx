import React from 'react';
import TitleHeader from '../../components/TitleHeader';
import AchiveComponent from '../../components/Layout/Modals/achive';

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