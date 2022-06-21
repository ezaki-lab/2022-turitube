import React, { createContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"
import urlJoin from 'url-join';

const Context = createContext({} as {
    Socket: Socket,
    count: number,
    setCount: any,
    text: string,
    setText: any
})
// こっちじゃないよ

export function ContextChatRoomProvider({children}){

    const [Socket, setSocket] = useState<Socket>();
    const [count,  setCount] = useState<number>();
    const [text, setText] = useState<string>("");

    const namespace = "test"

    useEffect(() => {
        const uri = urlJoin(
            process.env.SOCKET_URI,
            namespace
        );
        console.log(uri);

        const path = urlJoin(
            process.env.SOCKET_PATH,
            'socket.io'
        )

        console.log(path);

        setSocket(io("http://localhost:6002/test", {path: "/socket.io/"}))

    }, [namespace])

    return (<Context.Provider value={{ Socket, count, setCount, text, setText }}>
        {children}
    </Context.Provider>)
}

export default Context