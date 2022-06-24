import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import urlJoin from 'url-join';

const useSocketIo = (namespace = '') => {
  const [socket, setSocket] = useState<Socket>();

  const uri = urlJoin(
    process.env.SOCKET_URI,
    namespace
  );

  const path = urlJoin(
    process.env.SOCKET_PATH,
    'socket.io'
  );

  useEffect(() => {
    setSocket(io(uri, { path: path }));
  }, [namespace]);

  useEffect(() => {
    if (!socket) {
      return;
  }
    socket.on("close", function(event){
      console.log("切断されたらしい")
      setSocket(io(uri, { path: path }));
  })
}, [socket])

return socket;
};

export default useSocketIo;