/*  User */
import React, { useContext, useEffect, useState } from 'react';
import useSocketIo from '../../hooks/useSocketIo';

// ちゃっとのてすと
const Chat = () => {
    const [count, setCount] = useState(0); 
    const [text, setText] = useState("");
    const socket = useSocketIo('test');

    useEffect(() => {
        if (!socket) {
            return;
          }
        socket.on("count_update", function (msg) {
            console.log(msg);
            setCount(msg.count);
        });

        return (() => {
            socket.disconnect();
          });
          
    }, [socket])

    return (
        <>
            <div>
                <p>現在の接続者数: {count}</p>
                <textarea id="text" name="text"></textarea>
            </div>
        </>
    );
};

export default Chat;