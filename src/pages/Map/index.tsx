/*  User */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import io, { Socket } from "socket.io-client";
import Context from '../../common/socContext';

// ユーザーページ
const Map = () => {
  const {Socket, setSocket} = useContext(Context)
  const [nickname, setNickname] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    Socket.on("count_update", function(msg) {
      console.log(msg);
      setCount(msg.user_count);
    });
  }, [])

  return (
    <div>
      <p>現在の接続者数: {count}</p>
      <textarea id="text" name="text"></textarea>
    </div>
  )

  /*
  return (
    <div>
        <div>
            <input id="m1" autoComplete="off" placeholder="nickname" onChange={event => setNickname(event.target.value)}/>
            <button onClick={socketSetNickname}>submit</button>

            <input id="m2" autoComplete="off" placeholder="message" onChange={(event) => setInputMessage(event.target.value) }/>
            <button onClick={addMessage}>submit</button>
        </div>
    </div>
    
    <p>現在の接続者数<span id="user_count"></span>人</p>
    <textarea id="text" name="text" rows="10" cols="60"></textarea>

    <script type="text/javascript" charset="utf-8">
      var socket = io();

      // 接続者数の更新
      socket.on('count_update', function(msg) {
        $('#user_count').html(msg.user_count);
      });
      
      // テキストエリアの更新
      socket.on('text_update', function(msg) {
        $('#text').val(msg.text);
      });
      
      // テキストエリアが変更されると呼び出される
      $('#text').on('change keyup input', function() {
        socket.emit('text_update_request', {text: $(this).val()});
      });
      */
};

export default Map;