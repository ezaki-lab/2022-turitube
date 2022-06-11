import { useEffect, useState } from 'react';
import  useHeadRoute  from "./useHeadRoute"

// 識別用のルートを取得
const useIdRoute = () => {
  const id = {
      "/": "home",
      "/map": "map",
      "/fishing": "fishing",
      "/notification": "notification",
      "/diary": "diary"
  }

  const headRoute = useHeadRoute();

  const [route, setRoute] = useState('home');

  useEffect(() => {
    setRoute(id[headRoute])
  }, [headRoute]);

  return route;
};

export default useIdRoute;