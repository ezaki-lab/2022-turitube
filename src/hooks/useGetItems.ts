import { useEffect, useState } from 'react';
import axios from 'axios';
import Url from '../utils/url';
import { useRecoilState } from 'recoil';
import * as atom from '../common/atom';

// 識別用のルートを取得
const useGetItems = (type) => {
  const [items, setItems] = useState([]);
  const [userId] = useRecoilState(atom.user_id);

  useEffect(() => {
    axios.get(Url("/items"), {
      params: {
        user_id: userId,
        type: type
      }
    }).then((res) => {
      setItems(res.data);
    })
  }, []);

  return items
}
export default useGetItems;