import React, { useState, useRef, useEffect } from 'react';
import SelectImage from '../../img/select_img.png';
import { useNavigate } from 'react-router-dom';
import { RoomIdCreate } from '../../utils/roomIdCreate';
import axios from 'axios';

// 配信開始モーダル
const Modal = () => {
  const [image, setImage] = useState<File>(null);
  const [friendOnlyChecked, setFriendOnlyChecked] = useState(false);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const navigate = useNavigate();

  const base_url = "https://ezaki-lab.cloud/~turitube/api/stream"

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
        tag: tagRef.current.value
      };

      var base64img = null;

      const start = () => {
        axios.post(base_url, {
          room_id: room_id,
          setting: setting,
          base64img: base64img
        }).then((res) => {
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
    console.log(e)
    setImage(e.target.files[0]);
    console.log(e.target.file);
  }

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal w-screen">
        <div className="modal-box w-3/4 max-w-6xl">
          <label htmlFor="my-modal-3" className="btn btn-md btn-circle bg-basic text-xl font-bold border-basic absolute right-2 top-2">✕</label>
          <h2 className="text-xl font-bold text-basic">新しく配信を始める</h2>
          <p className="py-4 font-bold text-lg">配信設定</p>

          <img src={image ? window.URL.createObjectURL(image) : SelectImage} className="aspect-video object-cover w-full my-2" />
          <input id={"img_select"} type="file" accept="image/*,.png,.jpg,.jpeg,.gif" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)} />
          <label htmlFor={"img_select"} className="btn bg-basic border-basic my-2">サムネイルを設定</label>


          <input type="text" placeholder="タイトル" className="input input-bordered w-full my-2" ref={titleRef} />
          <input type="text" placeholder="タグ(空白で分ける)" className="input input-bordered w-full my-2" ref={tagRef} />
          <div className="form-control">
            <label className="label w-32 cursor-pointer">
              <p className="label-text">友達のみ</p>
              <input type="checkbox" checked={friendOnlyChecked} className="checkbox my-2" onChange={(e) => { setFriendOnlyChecked(friendOnlyChecked ? false : true) }} />
            </label>
          </div>
          <div className="flex justify-end my-4">
            <button className="btn btn-active border-basic text-white bg-basic tracking-wide" onClick={startStream}>配信開始!</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Modal;