import React, { useState, useRef, useEffect } from 'react';
import Camera from '../../../img/icons/camera.png';
import Host from '../../../img/icons/host.png';

// 配信中設定モーダル
const UsersModal = ({ myStream, remoteStream }) => {
  return (
    <>
      <input type="checkbox" id="users-modal" className="modal-toggle" />
      <div className="modal w-screen">
        <div className="modal-box w-3/4 max-w-6xl">
          <label htmlFor="users-modal" className="btn btn-md btn-circle bg-basic text-xl font-bold border-basic absolute right-2 top-2">✕</label>
          <h2 className="text-xl font-bold text-basic">参加ユーザー</h2>

          <h3 className="text-md font-bold text-black pt-8">配信者</h3>
          <ul className="flex flex-col">
            {myStream.is_streamer ? <UserInfo user={myStream} /> : <></>}
            {remoteStream.users.map((user, index) => {
              if (user.is_streamer) return (<UserInfo user={user} key={user.sid} />)
            })}
          </ul>

          <h3 className="text-md font-bold text-black pt-8">視聴者</h3>
          <ul className="flex flex-col">
            {!myStream.is_streamer ? <UserInfo user={myStream} /> : <></>}
            {remoteStream.users.map((user, index) => {
              if (!user.is_streamer) return (<UserInfo user={user} key={user.sid} />)
            })}
          </ul>
        </div>
      </div>
    </>
  )
}

const UserInfo = ({ user }) => {
  return (
    <li className="flex flex-row items-center">
      <div className="w-4 mr-2">
        {user.is_host ? <img className="aspect-square" src={Host} /> : <></>}
      </div>
      <p className="w-20 text-xs">{user.screen_name}</p>
      <p className="w-20 text-xs text-gray-400">{user.user_name}</p>
      <p className="w-8 text-xs text-gray-400">Lv.{user.lv}</p>
    </li>
  )
}

export default UsersModal;