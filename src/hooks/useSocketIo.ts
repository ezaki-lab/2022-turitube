import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import urlJoin from 'url-join';

// socket.ioに接続する。namespaceでsocket先を分ける。
const useSocketIo = (namespace:string = '') => {
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
        setSocket(io(uri, { path: path, transports: ["polling"]})); // pollingにしないとエラー吐くよ
  }, [namespace]);

return socket;
};

export default useSocketIo;