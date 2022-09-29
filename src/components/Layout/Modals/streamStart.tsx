import { useRecoilState } from 'recoil';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RoomIdCreate } from '../../../utils/roomIdCreate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectImage from '../../../img/select_img.png';
import * as atom from '../../../common/atom';
import Url from '../../../utils/url';

// 配信開始モーダル
const StreamStartComponent = () => {
  const [image, setImage] = useState<File>(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const maxStreamerRef = useRef(null);
  const maxListenerRef = useRef(null);
  const navigate = useNavigate();
  const [userType, setUserType] = useRecoilState(atom.user_type);
  const [me, setMe] = useRecoilState(atom.me);

  useEffect(() => {
    console.log(image);
  }, [image])

  // 配信開始(タイトルとか入ってたら)
  const startStream = () => {
    if (titleRef.current.value && tagRef.current.value) {
      // roomidを作成
      const room_id = RoomIdCreate()
      // 配信情報を送信
      const setting = {
        title: titleRef.current.value,
        tag: tagRef.current.value,
        max_streamer: maxStreamerRef.current.value,
        max_listener: maxListenerRef.current.value
      };

      var base64img = null;

      const start = () => {
        axios.post(Url("/room"), {
          user_name: me.user_name,
          room_id: room_id,
          setting: setting,
          base64img: base64img
        }).then(() => {
          setUserType("streamer");
          navigate("/room/" + room_id);
        })
      }

      if (image) {
        const reader = new FileReader()
        reader.onload = async (event) => {
          base64img = await reader.result;
          console.log(base64img);
          start()
        }
        reader.readAsDataURL(image)
      }
      else start();

    }
  }

  const handleOnAddImage = (e) => {
    setImage(e.target.files[0]);
  }

  return (
    <>
      <input type="checkbox" id="start_stream" className="modal-toggle" />
      <div className="modal w-screen">
        <div className="modal-box w-3/4 max-w-6xl">
          <label htmlFor="start_stream" className="btn btn-md btn-circle bg-basic text-xl font-bold border-basic absolute right-2 top-2">✕</label>
          <h2 className="text-xl font-bold text-basic">新しく配信を始める</h2>
          <p className="py-4 font-bold text-lg">配信設定</p>

          <img src={image ? window.URL.createObjectURL(image) : SelectImage} className="aspect-video object-cover w-full my-2" />
          <input id={"img_select"} type="file" accept="image/*,.png,.jpg,.jpeg,.gif" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)} />
          <label htmlFor={"img_select"} className="btn bg-basic border-basic my-2">サムネイルを設定</label>


          <input type="text" placeholder="タイトル" className="input input-bordered w-full my-2" ref={titleRef} />
          <input type="text" placeholder="タグ(空白で分ける)" className="input input-bordered w-full my-2" ref={tagRef} />
          <input type="number" placeholder="最大配信人数(初期値8)" className="input input-bordered w-full my-2" ref={maxStreamerRef} />
          <input type="number" placeholder="最大視聴人数(初期値3)" className="input input-bordered w-full my-2" ref={maxListenerRef} />
          
          <div className="flex justify-end mt-4">
            <button className="btn btn-active border-basic text-white bg-basic tracking-wide" onClick={startStream}>配信開始!</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default StreamStartComponent;