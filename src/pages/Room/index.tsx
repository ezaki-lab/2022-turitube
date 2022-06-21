/*  Room */
import React, { useContext, useEffect, useState } from 'react';
import useSocketIo from '../../hooks/useSocketIo';
import { useParams } from 'react-router-dom';

// ちゃっとのてすと
const Chat = () => {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");
    const {room_id} = useParams();
    const socket = useSocketIo('chat');

    useEffect(() => {
        if (!socket) {
            return;
        }

        socket.on('connect', function(){
            console.log(socket)
            socket.emit("join", {"room_id": room_id,});
        })

        socket.on('text_update', (msg) => {
            setText(msg.text);
          });

        return (() => {
            socket.disconnect();
        });
    }, [socket])

    const handleInput = (e) => {
        setText(e.target.value);

        socket.emit('text_update_request',
            {
                'text': e.target.value,
                'room_id': room_id
            }
        );
    };

    return (
        <>
            <div>
                <p>現在の接続者数: {count}</p>
                <textarea
                    className="mt-5 w-full h-40 p-3 border-2 border-sky-300 rounded-xl"
                    value={text}
                    onInput={handleInput}
                />
            </div>
        </>
    );
};

export default Chat;