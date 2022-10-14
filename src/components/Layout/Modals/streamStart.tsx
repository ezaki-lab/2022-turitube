import { useRecoilState } from 'recoil';
import React, { useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import { RoomIdCreate } from '../../../utils/roomIdCreate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SelectImage from '../../../img/select_img.png';
import * as atom from '../../../common/atom';
import Url from '../../../utils/url';
import Resizer from 'react-image-file-resizer';

// 配信開始モーダル
const StreamStartComponent = () => {
  const [image, setImage] = useState(null);
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const maxStreamerRef = useRef(null);
  const maxListenerRef = useRef(null);
  const navigate = useNavigate();
  const [userType, setUserType] = useRecoilState(atom.user_type);
  const [me, setMe] = useRecoilState(atom.me);
  const [loading, setLoading] = useState<boolean>(false);

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

      axios.post(Url("/room"), {
        user_name: me.user_name,
        room_id: room_id,
        setting: setting,
        base64img: image
      }).then(() => {
        setUserType("streamer");
        navigate("/room/" + room_id);
      })
    }
  }

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        500,
        500,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri)
        },
        "base64"
      );
    });

  const handleOnAddImage = async(e) => {
    const file = e.target.files[0];
    const uri = await resizeFile(file);
    setImage(uri);
  }

  return (
    <>
      {loading ? <div className="w-full h-full z-10000 fixed bg-white bg-opacity-75 flex items-center justify-center" ><ReactLoading type="spinningBubbles" color='40A4CE' height={'20%'} width={'20%'} /></div> : <></>}
      <input type="checkbox" id="start_stream" className="modal-toggle" />
      <div className="modal w-screen">
        <div className="modal-box w-3/4 max-w-6xl">
          <label htmlFor="start_stream" className="btn btn-md btn-circle bg-basic text-xl font-bold border-basic absolute right-2 top-2">✕</label>
          <h2 className="text-xl font-bold text-basic">新しく配信を始める</h2>
          <p className="py-4 font-bold text-lg">配信設定</p>

          <img src={image ? image : SelectImage} className="aspect-video object-cover w-full my-2" />
          <input id={"img_select"} type="file" accept="image/*,.png,.jpg,.jpeg,.gif" className="hidden" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnAddImage(e)} />
          <label htmlFor={"img_select"} className="btn bg-basic border-basic my-2">サムネイルを設定</label>

          <input type="text" placeholder="タイトル" className="input input-bordered w-full my-2" ref={titleRef} />
          <input type="text" placeholder="タグ(空白で分ける)" className="input input-bordered w-full my-2" ref={tagRef} />
          <input type="number" placeholder="最大配信人数(初期値8)" className="input input-bordered w-full my-2" ref={maxStreamerRef} />
          <input type="number" placeholder="最大視聴人数(初期値3)" className="input input-bordered w-full my-2" ref={maxListenerRef} />

          <div className="flex justify-end mt-4">
            <button className="btn btn-active border-basic text-white bg-basic tracking-wide" onClick={() => { setLoading(true); startStream(); }}>配信開始!</button>
          </div>

        </div>
      </div>
    </>
  )
}

export default StreamStartComponent;