import urlJoin from 'url-join';

// socket.ioの接続先指定
export const SocketUri = () => {
    return (process.env.SOCKET_PATH)
};
export const SocketPath = () => {
    return urlJoin(
        process.env.SOCKET_PATH,
        'socket.io'
    )
};
