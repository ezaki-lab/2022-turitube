import { useRecoilState } from 'recoil';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import * as atom from '../../common/atom';
import axios from 'axios'

// Home - streams.tsx
// 配信状況の取得と表示命令
const Streams = () => {
  const base_url = "https://ezaki-lab.cloud/~turitube/api/stream"
  const [streams, setStreams] = useState([]);
  const [i, setI] = useState(null);

  useEffect(() => {
    // 2秒おきに配信を取得する
    const intervalId = setInterval(function () {
      setI(new Date());
    }, 2000);

    axios.get(base_url).then((res) => {
      setStreams(res.data);
    })

    return () => {
      clearInterval(intervalId);
    };
  }, [i])

  // 配信がなかった時は
  if (!streams.length) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="font-bold text-lg text-basic">まだ誰も配信していないようです！</p>
          <p className="font-bold text-lg text-basic">上の項目の＋から配信を始めましょう！</p>
        </div>
      </>
    )
  }

  return (
    <>
      {streams.map((stream, i) => (
        <Card stream_info={stream} key={stream.room_id} />
      ))}

    </>
  );
};

const Card = ({ stream_info }) => {
  // 配信状況を引数で受け取ってそれを表示
  const stream_leader = stream_info.users[0].screen_name
  return (
    <Link to={"/room/" + stream_info.room_id}>
      <div className="w-full md:w-64 md:mx-4 bg-white-100 mb-8 flex flex-col">
        <img src={"https://ezaki-lab.cloud/~turitube/api/img/thumbnail/" + stream_info.thumbnail} className="aspect-video object-cover w-full" />
        <div className="flex-grow flex flex-row m-1">
          <div className="aspect-square h-8 flex items-center justify-center">
            <img src="https://tsurinews.jp/data/wp-content/uploads/2020/09/wpecDSC_3262-690x427.jpg" className="h-5/6 w-5/6 object-cover rounded-full" />
          </div>
          <div className="mx-1 flex-auto leading-5 flex flex-col">
            <h2 className="font-semibold text-xs">{stream_info.room_setting.title}</h2>
            <div className="flex flex-row">
              {stream_info.room_setting.tag.map((tag, i) => (
                <p className="text-basic text-xs mx-1" key={tag}>#{tag}</p>
              ))}
            </div>
            {
              <>
                <p className="text-xs">{stream_leader} 20分前 {stream_info.users.length}人</p>
              </>

            }

          </div>
        </div>
      </div>
    </Link>

  )
}

export default Streams;