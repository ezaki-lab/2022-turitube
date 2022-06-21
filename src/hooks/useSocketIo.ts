import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import urlJoin from 'url-join';

const useSocketIo = (namespace = '') => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const uri = urlJoin(
      process.env.SOCKET_URI,
      namespace
    );

    const path = urlJoin(
      process.env.SOCKET_PATH,
      'socket.io'
    );

    setSocket(io(uri, { path: path }));
  }, [namespace]);

  return socket;
};

export default useSocketIo;