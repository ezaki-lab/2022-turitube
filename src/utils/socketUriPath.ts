import urlJoin from 'url-join';

export const SocketUri = () => {
    return (process.env.SOCKET_PATH)
};
export const SocketPath = () => {
    return urlJoin(
        process.env.SOCKET_PATH,
        'socket.io'
    )
};
