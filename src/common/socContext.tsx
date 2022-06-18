import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client"

const Context = createContext({} as {
    Socket: any,
    setSocket: any
})

export function ContextSocketProvider({children}){
    const SOCKET_URI = process.env.SOCKET_URI;
    const SOCKET_PATH = process.env.SOCKET_PATH;
    const [Socket, setSocket] = useState(io(SOCKET_URI, {path: SOCKET_PATH + "/socket.io/"}));

    return (<Context.Provider value={{ Socket, setSocket }}>
        {children}
    </Context.Provider>)
}

export default Context