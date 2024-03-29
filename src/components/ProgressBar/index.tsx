import React from 'react';

const ProgressBar = ({ value, max, color="white" }) => {
  return (
    <div className="flex flex-row items-center justify-center w-full">
      <progress className="progress progress-info" value={value} max={max} />
      <h3 className={`text-${color} font-bold text-sm mx-2`}>{value}/{max}</h3>
    </div>
  )
}

export default ProgressBar