import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from './common/atom';
import axios from 'axios'

export const UserIdLogin = () => {
    const base_url = "https://ezaki-lab.cloud/~turitube/api/login";
    const [userInfo, setUserInfo] = useRecoilState(atom.user_info);
    axios.get(base_url, {
        params: {
            user_id: localStorage.getItem("userId")
        }
    }).then((res) => {
        // ユーザー(id準拠)が存在したらuserInfoに情報を書き込む
        if (res.data.status) {
            localStorage.setItem("userId", res.data.user_id);
            setUserInfo({...userInfo,
                user_name: res.data.user_name,
                screen_name: res.data.screen_name
            });
        }
        // ユーザーが存在しなかったらuserInfoとlocalStorageの情報を抹消
        else {
            localStorage.setItem("userId", res.data.user_id);
            setUserInfo({...userInfo,
                user_id: res.data.user_id,
            });
        }
    })
};
