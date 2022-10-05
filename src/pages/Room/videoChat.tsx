import React, { useEffect, useState } from 'react';

// Room チャット管理コンポーネント
const VideoChat = ({ socket }) => {
  const [msg, setMsg] = useState<string>("");
  useEffect(() => {
    if (socket) {
      // チャット送信時
      socket.on('chat', (data) => {
        setMsg(data.user_name + ": " + data.text)
      })

      // 退室時
      socket.on('leave', (data) => {
        setMsg(data.user_name + "が退出しました")
      })

      // 入室時
      socket.on('join', (data) => {
        setMsg(data.user_name + "が入室しました")
      })
    }
  }, [socket]);

  // チャット
  return (
    <div className="w-full bottom-0 fixed bg-black mx-2">
      <p className="text-white text-sm">{msg}</p>
    </div>

  );
};

export default VideoChat;