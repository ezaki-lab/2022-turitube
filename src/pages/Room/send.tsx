/*  Room/send */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as atom from '../../common/atom';

// チャット送信画面
const Send = (props) => {
    const socket = props.socket;
    const [message, setMessage] = useState("");
    const { room_id } = useParams();
    const [user, setUser] = useRecoilState(atom.user_info);

    useEffect(() => {
        setTimeout(() => {
            socket.emit('chat_update',
                {
                    'text': "が入室しました",
                    'room_id': room_id,
                    'screen_name': user.screen_name
                }
            );
        }, 200)
    }, [])

    const onClickSend = (e) => {
        if (message.match(/\S/g)) {
            console.log("sl")
            socket.emit('chat_update',
                {
                    'text': message,
                    'room_id': room_id,
                    'screen_name': user.screen_name
                }
            );
            setMessage("");
        }
    }

    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    };

    return (
        <>
            <div className="">
                <input
                    className="w-full text-white placeholder-white h-10 p-3 bg-yellow-100 bg-opacity-50 rounded-xl"
                    placeholder="コメントを入力"
                    value={message}
                    onChange={onChangeMessage}
                    onKeyPress={e => {
                        if (e.key == "Enter") {
                            onClickSend(e);
                        }
                    }}
                />
            </div>
        </>
    );
};

export default Send;