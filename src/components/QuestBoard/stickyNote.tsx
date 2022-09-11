import React from 'react';

const StickyNote = ({ text, color }) => {
  return (
    <div className={`bg-${color} w-16 h-5 -ml-2 flex flex-row`}>
      <div className={`bg-${color} w-20 h-full flex items-center justify-end`}>
        <h1 className={`text-white text-sm font-bold mr-2`}>{text}</h1>
      </div>
      <div className={`bg-${color}-dark w-4 h-full`} />
    </div>
  )
}

export default StickyNote;