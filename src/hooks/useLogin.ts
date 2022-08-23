import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import * as atom from '../common/atom';
import axios from 'axios'

// サイトに入った時にlocalStorageの情報だけでログインできるか試みる
// ログインできなければサインインページに飛ばす。ログインできればお望みのページに飛ばす。
export const UseLogin = () => {
    const base_url = "https://ezaki-lab.cloud/~turitube/api/login";
    const [userInfo, setUserInfo] = useRecoilState(atom.user_info);

    useEffect(() => {
        axios.get(base_url, {
            params: {
                user_id: localStorage.getItem("userId")
            }
        }).then((res) => {
            // ユーザー(id準拠)が存在したらuserInfoに情報を書き込む
            if (res.data.status) {
                localStorage.setItem("userId", res.data.user_id);
                setUserInfo({
                    ...userInfo,
                    user_name: res.data.user_name,
                    screen_name: res.data.screen_name,
                    avatar: res.data.avatar
                });
            }
            // ユーザーが存在しなかったらuserInfoとlocalStorageの情報を抹消
            else {
                localStorage.setItem("userId", res.data.user_id);
                setUserInfo({
                    ...userInfo,
                    user_id: res.data.user_id,
                });
            }
        })
    }, [])

};
