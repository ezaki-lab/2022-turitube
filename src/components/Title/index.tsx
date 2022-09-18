import React from 'react';

// 称号
const Title = ({ text, bgcolor, textcolor = "white", textsize="xxs", h="6", w="" }) => {
  return (
    <>
    <div className="bg-lv1 bg-lv2 bg-lv3 bg-lv4 bg-lv5">

    </div>
      <div className={`border-gray-dark border rounded-full aspect-[4/1] h-${h} w-${w}`}>
        <div className={`bg-${bgcolor} h-full border-2 border-white rounded-full flex items-center justify-around`}>
          <p className={`text-${textcolor} font-bold text-${textsize} drop-shadow-xl`}>{text}</p>
        </div>
      </div>

    </>
  );
};

export default Title;