import React, { useLayoutEffect, useState } from 'react';

const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = (): void => {
      let ua = navigator.userAgent;
      if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
        
      }
      else setSize([window.innerWidth, window.innerHeight]);
    };

    const orientationChange = () : void => {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    window.addEventListener('orientationchange', orientationChange)
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export default useWindowSize