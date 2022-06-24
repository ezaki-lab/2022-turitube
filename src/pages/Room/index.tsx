/*  Room */
import React, { useEffect, useState } from 'react';
import useSocketIo from '../../hooks/useSocketIo';
import { useParams } from 'react-router-dom';
import Chat from './chat';
import Stream from './stream';
import Send from './send';


// ちゃっとのてすと
const Room = () => {
    const [count, setCount] = useState(0);
    const socket = useSocketIo('chat');


    return (
        <>
            <div className="flex flex-col w-full h-screen">

                <div className="w-full h-12 fixed top-0 flex flex-row items-center p-2 z-50 bg-opacity-50">
                    <p>header...現在の接続者数: {count}</p>
                </div>



                <div className="flex-grow">
                    <Stream />
                </div>


                <div className="flex flex-col fixed h-full w-full pt-12 z-51">
                    <div className="flex-grow flex flex-row">
                        <div className="flex-grow" />
                        <div className="w-64 lg:w-96 h-full flex flex-col">
                            <div className="flex-grow" />
                            <Chat socket={socket}/>
                        </div>
                    </div>
                    <div className="h-14 w-full flex flex-row px-8">
                        <div className="flex-grow mx-2">
                            <Send socket={socket}/>
                        </div>
                        <div className="mutebutton w-14 h-14">
                            a
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default Room;