import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 冒頭部分のルートを取得
const useHeadRoute = () => {
    const router = useLocation();
  
    const [route, setRoute] = useState('/');
  
    useEffect(() => {
      const head = router.pathname.split('/')[1];
      setRoute('/' + head);
    }, [router.pathname]);
  
    return route;
  };

export default useHeadRoute;