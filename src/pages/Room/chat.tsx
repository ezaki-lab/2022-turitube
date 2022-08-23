/*  Room/chat */
import React, { useEffect, useState, useRef } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

// チャットログを流すためのコンポーネント
const Chat = ({socket}) => {
    const [messageList, setMessagelist] = useState([]);

    useEffect(() => {
        if (!socket) {
            return;
        }
    
        socket.on("chat", (data) => {
            setMessagelist((messageList) => [...messageList, data])
        })
    }, [socket])

    return (
        <>
            <div className="h-full w-full overflow-x-hidden whitespace-normal">
                <ScrollToBottom>
                    <ul className="w-full">
                    {messageList.map((data, index) => {
                        return (<li key={index} className="my-2">
                            <div className="rounded-lg bg-white bg-opacity-50 text-sm py-1 mx-6 container my-auto flex flex-row w-auto">
                                <div className="aspect-square h-8 flex items-center justify-center">
                                    <img src="https://tsurinews.jp/data/wp-content/uploads/2020/09/wpecDSC_3262-690x427.jpg" className="h-5/6 w-5/6 object-cover rounded-full" />
                                </div>
                                <p className="flex-auto break-words w-full pr-10 color-black">{data.screen_name} {data.text}</p> 
                            </div>
                        </li>);
                    })}
                </ul>
                </ScrollToBottom>
            </div>
        </>
    );
};

export default Chat;